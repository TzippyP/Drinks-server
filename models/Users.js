const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: String,
    token: { type: String, required: true },
    drinks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Drinks'
    }]
})
module.exports = mongoose.model('Users', userSchema)