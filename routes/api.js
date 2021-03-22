const router=require('express').Router()
const User=require('../controllers/user')
const Drink=require('../controllers/drinks')

//user
router.post('/login',User.login) 
router.post('/newUser',User.newUser) 
// router.get('/g',User.g) 

//drinks
router.get('/getAllDrinks',Drink.getAllDrinks)
router.get('/getDrinkByName/:name',Drink.getDrinkByName)
// router.get('/getDrinksHistory',Drink.getDrinksHistory)

module.exports = router; 
