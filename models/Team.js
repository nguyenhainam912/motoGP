
const  mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true, default: "MotoGP", enum: ['MotoGP', 'Moto2', 'Moto3', 'MotoE']},
});

module.exports = mongoose.model('Team', TeamSchema)


