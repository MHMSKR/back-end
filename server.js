const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
global.__basedir = __dirname
const port = process.env.API_PORT || process.env.PORT
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// import passport config
require('./config/passport')
require('./config/cron-job')
// use public folder
app.use(express.static(path.join(__dirname, 'public')))

// use middleware jwttoken for esp32 
app.use('/esp',require('./app/routes/esp.api.js'))

// use middleware for rigister api
app.use('/auth', require('./app/routes/auth.api.js'))

// use middleware for user authentications with jwt token
app.use('/me', passport.authenticate('user_auth', { session: false }), require('./app/routes/user.api.js'))

// response default root path of server
app.get('/',(req,res)=>{
    res.send({server:{
        message : "Hello World Of HesCas Project"
    }})
})

// listening of server
app.listen(port, () => {
    console.log("server an listen on link "+ port)
})