const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
// const LocalStorage = require('node-localstorage').LocalStorage
// const localStorage = new LocalStorage('./scratch');

const login = async (req, res) => {
    try {

        let user = await Users.findOne({ email: req.body.email, password: req.body.password }).populate('drinks')
        if (user) {
            process.env.TOKEN=user.token
            // localStorage.setItem('token',user.token)
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ msg: 'the user is not found' })
        }
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}
const newUser = async (req, res) => {
    try {
        let user = await new Users(req.body)
        user.token = jwt.sign({ 'email': user.email, 'password': user.password }, process.env.SECRET)
        process.env.TOKEN=user.token
        await user.save()
        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { login, newUser }