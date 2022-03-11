const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.API_PORT || process.env.PORT

// import router api
require('./app/routes/api.route.js')(app)

// listening of server
app.listen(port, () => {
    console.log("server an listen on link " + `http://localhost:` + port)
})