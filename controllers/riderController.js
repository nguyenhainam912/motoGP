const Rider = require('../models/Rider')
const Country = require('../models/Country')


module.exports = {
    add: async (req,res)=> {
        const {name, hashtag, image, category, point, countryId, teamId} = req.body;

        if(!name || !hashtag || !image || !category || !countryId || !teamId ) {
            return res.status(400).json({status: false, message: "You have a missing field"})
        }

        try{
            const newRider = new Rider(req.body)

            await newRider.save()

            return res.status(201).json({status: true, message: "Rider added successfully"})

        }catch(e) {
            return res.status(500).json({status: false, message: e.message})

        }
    },
    getById: async (req,res) => {
        const id = req?.query?.id
        try{
           const rider = await Rider.findById(id)
           .populate('countryId')
           .populate('teamId' )

           res.status(200).json(rider)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    getByCategory: async (req,res) => {
        try{
           const rider = await Rider.find({category: req?.query?.category})
           .populate('countryId')
           .populate('teamId' )
           .sort({ point: -1 });

           res.status(200).json(rider)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    getAll: async (req,res) => {
        try{
            const list = await Rider.find().limit(50)
            .populate('countryId')
            .populate('teamId' )
             return res.status(200).json(list)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
 
        }
    }, 
    update: async (req,res) => {
        try{
            const {id, name, image, point,hashtag,category, countryId, teamId} = req.body;
            console.log(id)

            await Rider.findOneAndUpdate({_id: id}, {name: name,image: image,
                point: point,hashtag: hashtag
                ,category: category,countryId: countryId,teamId:teamId },{returnOriginal:false});

            return res.status(201).json({status: true, message: "updated successfully"})
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    delete: async(req,res) => {
        try {
            await Rider.findByIdAndDelete(req?.query?.id)

            res.status(200).json({status: true, message: "Deleted"})
        } catch (e) {
            res.status(500).json({status: true, message: e.message})
            
        }
    },
}