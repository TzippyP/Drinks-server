const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes/api')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const User=require('./controllers/user')
dotenv.config()
// const LocalStorage = require('node-localstorage').LocalStorage
// const localStorage = new LocalStorage('./scratch');


const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopogy: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams).then(() => {
    console.log('db working');
}).catch((err) => {
    console.log('error: ' + err);
});
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept, Authorization');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use((req, res, next) => { 
    if (req.method === 'GET') {
        // console.log('token '+window.localStorage.getItem('token'));
        // console.log('token '+localStorage.getItem('token'));
        // console.log('header '+req.header('authorization'));
        if (req.header('authorization') !==process.env.TOKEN)
            res.status(401).json({ 'msg': 'Authorization failer' })
    }
    next()
})
app.use('/', router);

app.listen(process.env.PORT, console.log('runing...'));