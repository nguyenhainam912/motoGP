
const  mongoose = require('mongoose')

const CalendarSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    location: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    image: {type: String, required: true},
    layout: {type: String, required: true},
    sponsorImage: {type: String, required: false},
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true,
    },
});

module.exports = mongoose.model('Calendar', CalendarSchema)
