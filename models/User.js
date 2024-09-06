
const  mongoose = require('mongoose')

const UserSchema = new mongoose. Schema ({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userType: {type: String, required: true, default: "Client", enum: ['Client', 'Admin']},
    });

module.exports = mongoose.model('User', UserSchema)