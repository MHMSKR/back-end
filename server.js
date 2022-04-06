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
    // import router api
app.use(express.static(path.join(__dirname, 'public')))
app.use('/auth', require('./app/routes/auth.api.js'))
app.use('/me', passport.authenticate('jwt', { session: false }), require('./app/routes/user.api.js'))
    // listening of server
app.listen(port, () => {
    console.log("server an listen on link " + `http://localhost:` + port)
})