const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.API_PORT || process.env.PORT
    // import passport config
require('./config/passport')
    // import router api
app.use('/auth', require('./app/routes/auth.api.js'))
app.use('/me', passport.authenticate('jwt', { session: false }), require('./app/routes/user.api.js'))
    // listening of server
app.listen(port, () => {
    console.log("server an listen on link " + `http://localhost:` + port)
})