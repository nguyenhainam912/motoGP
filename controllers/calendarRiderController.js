const CalendarRider = require('../models/CalendarRider')
const Rider = require('../models/Rider')


module.exports = {
    add: async (req,res)=> {
        const {calendarId, riders, category, session} = req.body;

        if(!calendarId || !riders || !category  || !session  ) {
            return res.status(400).json({status: false, message: "You have a missing field"})
        }

        try{
            riders.sort(compareTotalTime);
            

            if(session == 'RAC') {
                // const result = calendarRiders.reduce((acc, session) => {
                //     session.riders.forEach(rider => {
                //       const existingRider = acc.find(item => item.riderId.equals(rider.riderId));

                //       if (existingRider) {
                //         existingRider.timeFinish = totalTime(rider.timeFinish, existingRider.timeFinish);
                //       } else {
                //         acc.push({ riderId: rider.riderId, timeFinish: rider.timeFinish });
                //       }
                //     });
                //     return acc;
                // }, []);

                let point = [25, 20, 15, 13, 11, 10, 9,8,7,6,5,4,3,2,1];

                riders.forEach((item, index) => {
                    if(index >= point.length) {
                        item.point = 0
                        return
                    }
                    item.point = point[index];
                });
    
                riders.forEach(async(item) => {
                    const rider = await Rider.findById(item.riderId)
                    rider.point += item.point

                    rider.save()
                });
    
                const calendarRider = new CalendarRider({calendarId, riders: riders, category, session: "RAC"})

                await calendarRider.save()


            } else if (session == 'SPR') {
                    let point = [12, 9,7,6,5,4,3,2,1];
    
                    riders.forEach((item, index) => {
                        if(index >= point.length) {
                            item.point = 0
                            return
                        }
                        item.point = point[index];
                    });

                    riders.forEach(async(item) => {
                        const rider = await Rider.findById(item.riderId)
                        rider.point += item.point
    
                        rider.save()
                    });
    
                    const calendarRider = new CalendarRider({calendarId, riders: riders, category, session: "SPR"})
    
                    await calendarRider.save()
            }else {
                const calendarRider = new CalendarRider({calendarId, riders, category, session})

                 await calendarRider.save()
            }
            return res.status(201).json({status: true, message: "calendar Rider added successfully"})

        }catch(e) {
            return res.status(500).json({status: false, message: e.message})

        }
    },
    getByCalendarCategorySession: async (req,res) => {
        try{
           var calendarRider = await CalendarRider.find({
                calendarId: req?.query?.calendarId, category: req?.query?.category, 
                session: req?.query?.session, 
            })
           .populate([
            { path: 'calendarId', select: 'startDate' },
            {
              path: 'riders',
              populate: [
                {
                  path: 'riderId',
                  model: 'Rider',
                  select: '-point',
                  populate: [
                    {
                      path: 'countryId',
                      model: 'Country',
                    },
                    {
                        path: 'teamId',
                        model: 'Team',
                    },
                  ],
                },
              ],
            },
          ]);


            calendarRider = calendarRider.filter(item => {
                const year = new Date(item.calendarId.startDate).getFullYear();
                return year == req?.query?.year;
            });


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
    const timeA = parseFloat((a.timeFinish.replace(':', '')));
    const timeB = parseFloat(b.timeFinish.replace(':', ''));

    return timeA - timeB;
}