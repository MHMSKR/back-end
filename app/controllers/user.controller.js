const bcrypt = require('bcryptjs');
const multer = require('multer');
const { db } = require('../../config/database')
require('dotenv').config();


// api '/me/'
module.exports.me = function(req, res) {
    return res.send(req.user)
}

// api '/me/profile/'
module.exports.updateProfile = function(req, res) {

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
            db.query({ sql: 'UPDATE users SET passwd = ?', timeout: 1000 }, [bcrypt.hash(newPassword, 12)],
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

}