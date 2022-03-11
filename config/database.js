require('dotenv').config();

const mysql = require('mysql')
const db = mysql.createConnection({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})
db.connect(function(err) {
    if (err) {
        console.log(err)
        throw err;
    } else {
        console.log('Connected to DB');
    }
})

module.exports = { db };