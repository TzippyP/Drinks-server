const fetch = require('node-fetch');
const Drinks = require('../models/Drinks')
const User = require('../models/Users')


const url = 'https://www.thecocktaildb.com/api'

const getAllDrinks = (req, res) => {
    fetch(`${url}/json/v1/1/filter.php?a=Alcoholic`)
        .then(response => response.json())
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(400).send(err.message);
        })
}
const getDrinkByName = (req, res) => {
    fetch(`${url}/json/v1/1/search.php?s=${req.params.name}`)
        .then(response => response.json())
        .then(async data => {
            try {
                let drink = await new Drinks(data.drinks[0])
                token=req.header('authorization'); 

                let u = await User.findOne({ token: token })

                drink.user = u._id

                await drink.save()
                let user = await User.findOneAndUpdate({ token:token }, { $push: { drinks: drink._id } })
                await user.save()
                res.status(200).json(drink)
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        }).catch(err => {
            res.status(400).send(err.message);
        })
}

// const getDrinksHistory = async (req, res) => {
//     try {
//         let drink = await User.findOne({ token: req.header['Authorization'] }).populate('drinks')
//         res.status(200).json(drink)
//     }
//     catch (err) {
//         res.status(400).send(err);
//     }
// }


module.exports = { getAllDrinks, getDrinkByName };
