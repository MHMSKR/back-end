const bcrypt = require('bcryptjs/dist/bcrypt');
const { redirect } = require('express/lib/response');
const jwt = require('jsonwebtoken')
const { db } = require('../../config/database')
require('dotenv').config();
const key = process.env.SECRET_KEY

module.exports.register = async function(req, res) {
    try {
        const { fullname, email, password } = req.body

        const encryptPassword = await bcrypt.hash(password, 12);

        db.query({ sql: "INSERT users (fullname,email,passwd) VALUES (?,?,?)", timeout: 1000 }, [fullname, email.toLowerCase(), encryptPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                return res.status(200).send({ "message": "Successfully insert Data to Database", "InsertID": result.InsertID })
            }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports.login = function(req, res) {
    // Get data input
    const { email, password } = req.body;

    // Validate email
    if (!(email && password)) {
        return res.status(400).send();
    }

    // Check email in database
    try {

        db.query({ sql: "SELECT user_id,passwd,fullname FROM users WHERE email = ?", timeout: 1000 }, [email.toLowerCase()],
            (err, result) => {
                if (err) {
                    return res.status(400).send(err)
                }
                if (result.length != 0) {
                    const match = bcrypt.compare(password, result[0].passwd)
                    if (!match) {
                        return res.status(403).send("password or email incorrect")
                    } else {
                        let payload = {
                            sub: result[0].user_id,
                            name: result[0].fullname,
                            iat: new Date().getTime()
                        }
                        const token = jwt.sign(payload, key, { expiresIn: '1h' })
                        db.query({ sql: "UPDATE users SET token = ? WHERE user_id = ? ", timeout: 1000 }, [token, result[0].user_id],
                            (err, result) => {
                                if (err) throw err;
                                return res.send({
                                    token: token,
                                    key: key
                                })
                            })
                    }

                } else {
                    return res.status(401).send(" Please Register")
                }

            })

    } catch (error) {

    }

}

module.exports.list = function(req, res) {
    db.query({ sql: "SELECT * FROM users", timeout: 1000 }, function(err, result) {
        if (err) {
            console.log(err);
            return res.status()
        } else {
            return res.send(result)
        }

    })

}

module.exports.updateProfile = function(req, res) {
    const id = req.body.id;
    const profile = req.body.profileImage;
    db.query(
        "UPDATE users SET profileImage = ? WHERE userId = ?", [profile, id], (err, result) => {
            if (err) {
                console.log(err)
                throw err
            } else {
                res.send(result)
            }
        }
    )


}

module.exports.updatePassword = function(req, res) {

}
module.exports.updateImageProfile = function(req, res) {

}