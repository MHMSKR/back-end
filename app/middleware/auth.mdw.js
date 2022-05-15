const { db } = require('../../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer')
require('dotenv').config();
const { v4: uuidv4 } = require("uuid")
const passport = require('passport');
const ejs = require('ejs');
const fs = require('fs');
require('dotenv').config()

// Register middleware path of /auth
module.exports.register = (req, res, next) => {
    // Get data input from http body
    const { fullname, email, password, role } = req.body;

    // Validate request Input
    if (!(fullname && email && password)) {
        return res.status(400).send("All input is required!")
    }
    try { // Get Connection database 
        db.getConnection((err, db) => {
            if (err) throw err
            db.query({ sql: 'SELECT email,role FROM users', timeout: 1000 }, async (err, result) => {
                if (err) return res.status(500).send(err)
                // Validate email is ever register 
                matchEmail = await result.filter((users) => {
                    return users.email == email
                })
                hostRole = await result.filter((users) => {
                    return users.role == 'host'
                })
                // Validate result of database is null 
                if (matchEmail.length == 0) {
                    if (result.length >= 10) {
                        return res.status(400).send({ message: 'full user quota' })
                    } else {
                        if (hostRole.length == 0 && (role == 'host' || role == 'resident')) {
                            // encrypt password before save in database
                            const encryptPassword = await bcrypt.hash(password, 12);
                            const user_id = await uuidv4();
                            const refreshToken = await uuidv4();
                            db.query({ sql: "INSERT INTO users (user_id ,fullname,email,passwd,role) VALUES (?,?,?,?,?)", timeout: 1000 }, [user_id, fullname, email.toLowerCase(), encryptPassword, role],
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err)
                                    } else {
                                        db.query({ sql: "INSERT INTO rf_token (token,user_id) VALUES (?,?)", timeout: 1000 }, [refreshToken, user_id],
                                            (err, result) => {
                                                if (err) {
                                                    return res.status(500).send(err)
                                                }
                                                const accessToken = jwt.sign({
                                                    sub: fullname,
                                                    _id: user_id,
                                                    role: role,
                                                    iat: new Date().getTime()
                                                },
                                                    process.env.SECRET_KEY, {
                                                    expiresIn: 1000 * 60 * 20, //1000ms * 60s * 60m * 24h
                                                    algorithm: 'HS256'
                                                }
                                                )
                                                return res.status(200).send({ message: "Register Success", accessToken: accessToken, refreshToken: refreshToken })

                                            }
                                        )
                                    }
                                }
                            )
                        } else if (hostRole.length == 1 && role != 'host') {
                            // encrypt password before save in database
                            const encryptPassword = await bcrypt.hash(password, 12);
                            const refreshToken = await uuidv4();
                            const user_id = await uuidv4();
                            db.query({ sql: "INSERT INTO users (user_id ,fullname,email,passwd,role) VALUES (?,?,?,?,?)", timeout: 1000 }, [user_id, fullname, email.toLowerCase(), encryptPassword, role],
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err)
                                    } else {
                                        db.query({ sql: "INSERT INTO rf_token (token,user_id) VALUES (?,?)", timeout: 1000 }, [refreshToken, user_id],
                                            (err, result) => {
                                                if (err) {
                                                    return res.status(500).send(err)
                                                }
                                                const accessToken = jwt.sign({
                                                    sub: fullname,
                                                    _id: user_id,
                                                    role: role,
                                                    iat: new Date().getTime()
                                                },
                                                    process.env.SECRET_KEY, {
                                                    expiresIn: 1000 * 60 * 10, //1000ms * 60s * 60m * 24h
                                                    algorithm: 'HS256'
                                                }
                                                )
                                                return res.status(200).send({ message: "Register Success", accessToken: accessToken, refreshToken: refreshToken })
                                            }
                                        )
                                    }
                                }
                            )


                        } else {
                            return res.status(400).send({ "message": "please change role to 'resident'" })
                        }

                    }

                } else {
                    return res.status(409).send({ "message": "Email Already Exists please login" })
                }

            })
            db.release()
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.Login = function (req, res, next) {
    passport.authenticate('local', { session: false },
        (err, user, info) => {
            if (err) return next(err)
            if (user) {
                const accessToken = jwt.sign({
                    sub: user.fullname,
                    _id: user.user_id,
                    role: user.role,
                    iat: new Date().getTime()
                },
                    process.env.SECRET_KEY, {
                    expiresIn: 1000 * 60 * 20, //1000ms * 60s * 60m * 24h
                    algorithm: 'HS256'
                }
                )
                return res.status(200).send({
                    status : "ok",
                    message:'Logged in',
                    accessToken,
                    refreshToken: user.token
                })
            } else {
                return res.status(422).json(info);
            }
        })(req, res, next)
}
module.exports.RefreshToken = (req, res) => {
    const { refreshToken } = req.body;
    try {
        db.getConnection((err, db) => {
            db.query({ sql: "SELECT users.*,rf_token.token FROM users INNER JOIN rf_token ON rf_token.user_id = users.user_id WHERE rf_token.token = ?", timeout: 1000 }, [refreshToken],
                (err, result) => {
                    if (err) {
                        return res.status(500).send({ message: err })
                    } else if (result.length == 0) {
                        return res.status(401).send({ message: "Invalid token" })
                    } else {
                        const accessToken = jwt.sign({
                            sub: result[0].fullname,
                            _id: result[0].user_id,
                            role: result[0].role,
                            iat: new Date().getTime()
                        },
                            process.env.SECRET_KEY, {
                            expiresIn: 1000 * 60 * 60, //1000ms * 60s * 60m * 24h
                            algorithm: 'HS256'
                        }
                        )
                        return res.status(200).send({ accessToken, refreshToken: result[0].token })
                    }

                }
            )
            if (err) return res.status(500).send(err)
            db.release()
        })
    } catch (error) {

    }
}

module.exports.generateToken =  (req, res) => {
    try {
        const esp_id =  uuidv4();
        const espToken =  jwt.sign({
            _id: esp_id,
            iat: new Date().getTime()
        },
            process.env.SECRET_KEY, {
            algorithm: 'HS256'
        })

        db.getConnection((err,db)=>{
            db.query({sql:"INSERT INTO esp (esp_id) VALUES (?)" ,timeout:1000},[esp_id],
            (err,result)=>{
                if(err) return res.status(500).send({ message: err })
                return res.status(200).send({token:espToken})
            })
            if(err) return res.status(500).send({err})
        })
  

    } catch (error) {
        res.status(500).send({error})
    }

}

// module.exports.userGetTest = () =>{
//     db.getConnection((err,db)=>{
//         db.query({sql:"SELECT * FROM users",timeout:1000},
//         (err,result)=>{
//             if(err) return res.status(500).send(err)
//             if(result.length !== 0){
//                 return res.status(200).send(result)
//             }
//         })
//         if(err) return res.status(500).send(err)
//     })
// }

