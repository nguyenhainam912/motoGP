
const  mongoose = require('mongoose')

const RiderSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    hashtag: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true, default: "MotoGP", enum: ['MotoGP', 'Moto2', 'Moto3', 'MotoE']},
    point: {type: Number, default: 0},
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
});

module.exports = mongoose.model('Rider', RiderSchema)
