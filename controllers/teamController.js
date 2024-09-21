const Team = require('../models/Team')
const Rider = require('../models/Rider')


module.exports = {
    add: async (req,res)=> {
        const {name, image, category, color} = req.body;

        if(!name || !image || !category || !color ) {
            return res.status(400).json({status: false, message: "You have a missing field"})
        }

        try{
            const newTeam = new Team(req.body)

            await newTeam.save()

            return res.status(201).json({status: true, message: "Team added successfully"})

        }catch(e) {
            return res.status(500).json({status: false, message: e.message})

        }
    },
    getById: async (req,res) => {
        const id = req?.query?.id
        try{
           const team = await Team.findById(id) 
           res.status(200).json(team)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    getByCategory: async (req,res) => {
        try{
            const team = await Team.find({category: req?.query?.category})

            const teamsWithRiders = await Promise.all(team.map(async (e) => {
                const riders = await Rider.find({ teamId: e.id }).select('name');
                return { ...e._doc, riders }; // Concisely merge team and riders using spread operator
            }));

            res.status(200).json(teamsWithRiders)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    getAll: async (req,res) => {
        try{
            const list = await Team.find().limit(50)
             return res.status(200).json(list)
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
 
        }
    }, 
    update: async (req,res) => {
        try{
            const {id, name, image, category} = req.body;

            await Team.findOneAndUpdate({_id: id}, {name: name,image: image,category: category},{returnOriginal:false});

            return res.status(201).json({status: true, message: "updated successfully"})
        }catch(e){ 
            res.status(500).json({status: false, message: e.message});
        }
    },
    delete: async(req,res) => {
        try {
            await Team.findByIdAndDelete(req?.query?.id)

            res.status(200).json({status: true, message: "Deleted"})
        } catch (e) {
            res.status(500).json({status: true, message: e.message})
            
        }
    }, 
}