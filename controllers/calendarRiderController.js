const CalendarRider = require('../models/CalendarRider')
const Rider = require('../models/Rider')


module.exports = {
    add: async (req,res)=> {
        const {calendarId, riders, category, session} = req.body;

        if(!calendarId || !riders || !category  || !session  ) {
            return res.status(400).json({status: false, message: "You have a missing field"})
        }

        try{
            const calendarRider = new CalendarRider({calendarId, riders, category, session})

            await calendarRider.save()

            if(session == 'PR') {
                var calendarRiders = await CalendarRider.find({calendarId: calendarId, category: category}) 

                const result = calendarRiders.reduce((acc, session) => {
                    session.riders.forEach(rider => {
                      const existingRider = acc.find(item => item.riderId.equals(rider.riderId));

                      if (existingRider) {
                        existingRider.timeFinish = totalTime(rider.timeFinish, existingRider.timeFinish);
                      } else {
                        acc.push({ riderId: rider.riderId, timeFinish: rider.timeFinish });
                      }
                    });
                    return acc;
                }, []);

                result.sort(compareTotalTime);

                let point = [25, 20, 15, 13, 11, 10, 9,8,7,6,5,4,3,2,1];

                result.forEach((item, index) => {
                    if(index >= point.length) {
                        item.points = 0
                        return
                    }
                    item.point = point[index];
                });

                console.log(result)


                result.forEach(async(item) => {
                    const rider = await Rider.findById(item.riderId)
                    rider.point += item.point

                    rider.save()
                });


                const calendarRiderE = new CalendarRider({calendarId, riders: result, category, session: "RAC"})

                await calendarRiderE.save() 
            }
            return res.status(201).json({status: true, message: "calendar Rider added successfully"})

        }catch(e) {
            return res.status(500).json({status: false, message: e.message})

        }
    },
    getByCalendarCategorySession: async (req,res) => {
        try{
           const calendarRider = await CalendarRider.find({calendarId: req?.query?.calendarId, category: req?.query?.category, session: req?.query?.session}) 
           res.status(200).json(calendarRider)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    update: async (req,res) => {
        try{
            // const {id, calendarId, riders, category} = req.body;


           
            // await CalendarRider.findOneAndUpdate(
            //     {_id: id}, 
            //     {
            //         calendarId: calendarId,riders: riders,category: category, session: session
            //     },
            //     {returnOriginal:false}
        // );

        //     return res.status(201).json({status: true, message: "updated successfully"})
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    delete: async(req,res) => {
        try {
            await CalendarRider.findByIdAndDelete(req?.query?.id)

            res.status(200).json({status: true, message: "Deleted"})
        } catch (e) {
            res.status(500).json({status: true, message: e.message})
            
        }
    }, 
  
}

function convertTime(a) {
    // Chuyển đổi chuỗi thời gian thành số mili giây để so sánh chính xác
    const timeA = parseFloat(a.replace(':', '.').replace('.',''))
    // Trả về giá trị âm nếu a lớn hơn b, dương nếu a nhỏ hơn b, và 0 nếu bằng nhau
    return +timeA;
}

function totalTime(a ,b) {
    // Chuyển đổi chuỗi thời gian thành số mili giây để so sánh chính xác
    const timeA = a.split(':').map(part => parseFloat(part));
    const timeB = b.split(':').map(part => parseFloat(part));

    const timeC = timeA[0]+timeB[0]
    const timeD = (timeA[1]+timeB[1]).toFixed(3)
    // Trả về giá trị âm nếu a lớn hơn b, dương nếu a nhỏ hơn b, và 0 nếu bằng nhau
    return`${timeC}:${timeD}`;
}

function compareTotalTime(a, b) {
    // Chuyển đổi totalTime thành số để so sánh
    const timeA = parseFloat(a.timeFinish.replace(':', '.'));
    const timeB = parseFloat(b.timeFinish.replace(':', '.'));
    return timeA - timeB;
}