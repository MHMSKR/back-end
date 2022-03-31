const { db } = require('../../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { v4: uuidv4 } = require("uuid")
const passport = require('passport')


// Register middleware path of /auth
module.exports.register = (req, res, next) => {
    // Get data input from http body
    const { fullname, email, password } = req.body;

    // Validate request Input
    if (!(fullname && email && password)) {
        return res.status(400).send("All input is required!")
    }
    try { // Get Connection database 
        db.getConnection((err, db) => {
            console.log('Connected to DB');
            // Validate email is ever register 
            db.query({ sql: "SELECT email FROM users WHERE email = ? ", timeout: 1000 }, [email.toLowerCase()],
                async(err, result) => {
                    if (err) {
                        return res.status(404).send(err)
                    }
                    // Validate result of database is null 
                    if (result.length == 0) {
                        // encrypt password before save in database
                        const encryptPassword = await bcrypt.hash(password, 12);
                        db.query({ sql: "INSERT INTO users (user_id ,fullname,email,passwd) VALUES (?,?,?,?)", timeout: 1000 }, [uuidv4(), fullname, email.toLowerCase(), encryptPassword],
                            (err, result) => {
                                if (err) {
                                    return res.status(500).send(err)
                                }
                                return res.status(200).send({ "message": "Successfully insert Data to Database", "InsertID": result.insertId })
                            }
                        )
                    } else {
                        return res.send({ "message": "please login" })
                    }
                }
            )
            if (err) throw err
            db.release()
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.Login = function(req, res, next) {
    passport.authenticate('local', { session: false },
        (err, user, info) => {
            if (err) return next(err)
            if (user) {
                const token = jwt.sign({
                        sub: user[0].fullname,
                        _id: user[0].user_id,
                        iat: new Date().getTime()
                    },
                    process.env.SECRET_KEY, {
                        expiresIn: 1000 * 60 * 10 //1000ms * 60s * 60m * 24h
                    }
                )
                return res.send({ token })
            } else {
                return res.status(422).json(info);
            }
        })(req, res, next)
}

module.exports.forgotPassword = function(req, res, next) {
    const email = req.body.email;

}