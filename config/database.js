const TOKEN_KEY = "HesCas_Project_Final"

const mysql = require('mysql')
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Sukree1411",
    port:3306,
    database:"hescas_db"
})
db.connect(function(err){
    if (err){
        console.log(err)
        throw err;
    }else{
        console.log('Connected to DB');
    }
})

module.exports = {db, TOKEN_KEY};