const Country = require('../models/Country')

module.exports = {
    add: async (req,res)=> {
        const {name, image} = req.body;

        if(!name || !image ) {
            return res.status(400).json({status: false, message: "You have a missing field"})
        }

        try{
            const newCountry = new Country(req.body)

            await newCountry.save()

            return res.status(201).json({status: true, message: "Country added successfully"})

        }catch(e) {
            return res.status(500).json({status: false, message: e.message})

        }
    },
    getById: async (req,res) => {
        const id = req?.query?.id
        try{
           const country = await Country.findById(id) 
           res.status(200).json(country)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    getAll: async (req,res) => {
        try{
            const list = await Country.find().limit(50)
             return res.status(200).json(list)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
 
        }
    }, 
    update: async (req,res) => {
        try{
            const {id, name, image, category} = req.body;
            console.log(id)

            await Country.findOneAndUpdate({_id: id}, {name: name,image: image,category: category},{returnOriginal:false});

            return res.status(201).json({status: true, message: "updated successfully"})
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    delete: async(req,res) => {
        try {
            await Country.findByIdAndDelete(req?.query?.id)

            res.status(200).json({status: true, message: "Deleted"})
        } catch (e) {
            res.status(500).json({status: true, message: e.message})
            
        }
    },

}