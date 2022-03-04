const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken')
const { db, TOKEN_KEY } = require('../../config/database')

const create = async function (req, res) {
    try {
        // Get user input
        const { username, email, password } = req.body;

        // Validate user input
        if (!(username && email && password)) {
            res.status(400).send("All data is required");
        }

        //check if user already exist
        //Validate if user exist in our database
        const oldUser = await db.query(
            "SELECT email FROM users WHERE email = ?", [email],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    return (result);
                }
            }
        )

        if (oldUser.email === email) {
            return res.status(409).send("User already exist. Please login")
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (username, email, passwd) VALUES (?,?,?)",
            [username, email, encryptedPassword],
            (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    // create token
                    const token = jwt.sign(
                        { user_id: result.userId, email },
                        TOKEN_KEY,
                        {
                            expiresIn: "2h"
                        }
                    )
                    db.query(
                        "UPDATE users SET token = ? WHERE userId = ?",
                        [token, result.userId], 
                        (err, result) => {
                            if (err) {
                                console.error(err); throw err;
                            } else {
                                res.send("Succesfully to update")
                            }
                        })
                        res.status(201).json(result)
                }
                

            }
        )
    } catch (error) {
        console.log(error)
    }
}

const login = function (req, res) {
    const payload = {
        sub: req.body.username,
        iat: new Date().getTime()
    };
    res.send(jwt.encode(payload, SECRET));
    res.send("login")
}

const list = function (req, res) {
    db.query("SELECT * FROM users", function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.send(result)
        }
    })
}

const update = function (req, res) {
    const id = req.body.id;
    const profile = req.body.profileImage;
    db.query(
        "UPDATE users SET profileImage = ? WHERE userId = ?",
        [profile, id], (err, result) => {
            if (err) {
                console.log(err)
                throw err
            } else {
                res.send(result)
            }
        }
    )

}

module.exports = { create, login, list, update }

