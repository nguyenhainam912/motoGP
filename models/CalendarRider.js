
const  mongoose = require('mongoose')

const ridersSchema = new mongoose.Schema({
    riderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Rider",},
    timeFinish: {type: String},
    point: {type: Number, default: 0},

  });

const CalendarRiderSchema = new mongoose.Schema ({
    calendarId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Canlendar",
        required: true,
    },
    riders : [ridersSchema], 
    category: {type: String, required: true, default: "MotoGP", enum: ['MotoGP', 'Moto2', 'Moto3', 'MotoE']},
    session: {type: String, required: true, default: "FP1", enum: ['FP1','FP2','Q1', 'Q2','SPR','WUP','PR','RAC']},

});



module.exports = mongoose.model('CalendarRider', CalendarRiderSchema)
