const Calendar = require('../models/Calendar')

module.exports = {
    add: async (req,res)=> {
        const {title, location, startDate, endDate, image, layout, sponsorImage, countryId} = req.body;

        if(!title || !location || !startDate|| !endDate|| !image|| !layout|| !sponsorImage|| !countryId ) {
            return res.status(400).json({status: false, message: "You have a missing field"})
        }

        try{
            const calendar = new Calendar(req.body)

            await calendar.save()

            return res.status(201).json({status: true, message: "Calendar added successfully"})

        }catch(e) {
            return res.status(500).json({status: false, message: e.message})

        }
    },
    getById: async (req,res) => {
        const id = req?.query?.id
        try{
           const calendar = await Calendar.findById(id).populate('countryId')
           res.status(200).json(calendar)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    getAll: async (req,res) => {
        try{
            const list = await Calendar.find().limit(50).populate('countryId')
             return res.status(200).json(list)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
 
        }
    }, 
    update: async (req,res) => {
        try{
            const {id, title, location, startDate,endDate,image,layout,sponsorImage,countryId} = req.body;

            await Calendar.findOneAndUpdate({_id: id}, {title: title,location: location,startDate: startDate, 
                endDate: endDate,image: image,layout: layout, sponsorImage: sponsorImage,countryId: countryId,},{returnOriginal:false});

            return res.status(201).json({status: true, message: "updated successfully"})
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    delete: async(req,res) => {
        try {
            await Calendar.findByIdAndDelete(req?.query?.id)

            res.status(200).json({status: true, message: "Deleted"})
        } catch (e) {
            res.status(500).json({status: true, message: e.message})
            
        }
    },
}