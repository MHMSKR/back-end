const bcrypt = require('bcryptjs');
const fs = require('fs')
const { db } = require('../../config/database');
require('dotenv').config();


// api '/me/'
module.exports.me = function(req, res) {
    try {
        fs.readFile('public/files/information.json', null, (err, data) => {
            if (err) throw err;
            return res.send({ user: req.user, info: JSON.parse(data) })
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

// api '/me/profile/'
module.exports.updateProfile = function(req, res) {
    if (req.user.role != 'host') {
        return res.status(401).send({ message: 'Permission denied!!' })
    } else {
        const information = req.body
        const data = JSON.stringify(information, null, 2)
        try {
            fs.writeFile('public/files/information.json', data, (err) => {
                if (err) throw err
                return res.status(200).send({ message: 'updated success' })
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}

// api '/me/update-password/'
module.exports.updatePassword = function(req, res) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const match = bcrypt.compare(oldPassword, req.user.passwd);
    if (!match) {
        return res.send('old Password in correct')
    } else {
        db.getConnection((err, db) => {
            if (err) return res.status(500).send(err)
            db.query({ sql: 'UPDATE users SET passwd = ? WHERE user_id = ?', timeout: 1000 }, [bcrypt.hash(newPassword, 12), req.user.user_id],
                (err, result) => {
                    if (err) return res.status(500).send(err)
                    return res.status(200).send({ "message": "Successfully Update password", "InsertID": result.insertId })
                })
            db.release();
        })
    }

}

// api 'me/update-profile-image'
module.exports.updateImageProfile = function(req, res) {
    try {
        if (req.file == undefined) {
            return res.status(400).send({ message: 'Please Upload file' })
        }
        const imageUrl = req.protocol + `://` + req.headers.host + `files/avatar/` + req.file.originalname
        db.getConnection((err, db) => {
            if (err) return res.status(500).send(err)
            db.query({ sql: 'UPDATE users SET image_profile = ? WHERE user_id = ?', timeout: 1000 }, [imageUrl, req.user.user_id], (err, result) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send({ message: 'successful upload imagefile' })
            })
        })
    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 10MB!",
            });
        }
        return res.status(500).send({ message: 'can not upload this file' })
    }
}