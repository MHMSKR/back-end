const { db } = require('../../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config();


// Register middleware
module.exports.register = (req, res, next) => {
    const { fullname, email, password } = req.body;

    // Validate request Input
    if (!(fullname && email && password)) {
        return res.status(400).send("All input is required!")
    }
    try {
        // Checking email in database
        db.query({ sql: "SELECT email FROM users WHERE email = ? ", timeout: 1000 }, [email.toLowerCase()],
            (err, result) => {
                if (err) {
                    return res.status(404).send(err)
                }
                if (result.length == 0) {
                    next();
                } else {
                    return res.send({ "message": "please login" })
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports.Auth = function(req, res, next) {
    next();

}