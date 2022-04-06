const { db } = require('../../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer')
require('dotenv').config();
const { v4: uuidv4 } = require("uuid")
const passport = require('passport');
const ejs = require('ejs');
const fs = require('fs');

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
            db.query({ sql: 'SELECT email,role FROM users', timeout: 1000 }, async(err, result) => {
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
                            db.query({ sql: "INSERT INTO users (user_id ,fullname,email,passwd,role) VALUES (?,?,?,?,?)", timeout: 1000 }, [uuidv4(), fullname, email.toLowerCase(), encryptPassword, role],
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err)
                                    }
                                    return res.status(200).send({ "message": "Successfully insert Data to Database", "InsertID": result.insertId })
                                }
                            )
                        } else if (hostRole.length == 1 && role != 'host') {
                            // encrypt password before save in database
                            const encryptPassword = await bcrypt.hash(password, 12);
                            db.query({ sql: "INSERT INTO users (user_id ,fullname,email,passwd,role) VALUES (?,?,?,?,?)", timeout: 1000 }, [uuidv4(), fullname, email.toLowerCase(), encryptPassword, role],
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err)
                                    }
                                    return res.status(200).send({ "message": "Successfully insert Data to Database", "InsertID": result.insertId })
                                }
                            )

                        } else {
                            return res.send({ "message": "please change role to 'resident'" })
                        }

                    }

                } else {
                    return res.send({ "message": "please login" })
                }

            })
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
                        role: user[0].role,
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

// // get email from user
// module.exports.forgotPassword = function(req, res, next) {
//     const email = req.body.email;
//     db.getConnection((err, db) => {
//         if (err) return next(err)
//         db.query('SELECT user_id,email FROM users WHERE email = ?', [email],
//             (err, result) => {
//                 if (err) return res.status(500).send(err)
//                 if (result.length == 0) {
//                     return res.status(401).send({ message: 'email not found' })
//                 } else {
//                     const token = jwt.sign({
//                             sub: "reset_password",
//                             _id: result[0].user_id,
//                             email: result[0].email,
//                             iat: new Date().getTime()
//                         },
//                         process.env.SECRET_KEY, {
//                             expiresIn: 1000 * 60 * 10 //1000ms * 60s * 60m * 24h
//                         }
//                     )
//                     req.user = { fullname: result[0].fullname, email: result[0].email, user_id: result[0].user_id, token }
//                     return next()
//                 }
//             })
//     })

// }

// module.exports.sendLink = (req, res, next) => {

//     const transporter = nodeMailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: '',
//             pass: ''
//         }
//     });
//     const resetPassLink = req.protocol + `://` + req.headers.host + `reset-password/:` + req.user.user_id + `/:` + req.user.token
//     const mailOption = {
//         from: '',
//         to: req.user.email,
//         subject: 'Reset password HesCasHome',
//         html: '<div><h4>เรียน' + req.user.fullname + '</h4><br/><p>คลิกลิงค นี้เพื่อรีเซตรหัสผ่าน</p></br>' + resetPassLink + '</div>'
//     }
//     transporter.sendMail(mailOption, (err, info) => {
//         if (err) return res.status(500).send(err)
//         return res.status(200).send({ message: "please check indox of your email", info })
//     })
// }
