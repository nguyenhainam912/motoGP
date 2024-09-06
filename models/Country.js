
const  mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema ({
    name: {type: String, required: true},
    image: {type: String, required: true},
});

module.exports = mongoose.model('Country', CountrySchema)
