const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cf = require('./config/config');

// import router api
require('./app/routes/api.route.js')(app)

// listening of server
app.listen(cf.port, () => {
    console.log("server an listen on link " + `http://localhost:` + cf.port)
})