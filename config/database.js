require('dotenv').config();

const mysql = require('mysql')
const db = mysql.createPool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})
module.exports = { db };