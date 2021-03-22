const mongoose = require('mongoose')

const drinkSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    strDrink: String,
    strInstructions:String,
    strCategory:String,
    strGlass:String,
    strDrinkThumb:String
})


module.exports = mongoose.model('Drinks', drinkSchema)