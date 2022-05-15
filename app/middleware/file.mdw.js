const multer = require('multer')
const maxSize = 10 * 1024 * 1024
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/public/files/avatar")
    },
    filename: function(req, file, cb) {
        const fullname = file.originalname;
        cb(null, fullname)
    },

});
const filter = (req, file, cb) => {
    if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpg') || (file.mimetype == 'image/jpeg')) {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }

}

const uploadFile = multer({
    storage: storage,
    fileFilter: filter,
    limits: { fileSize: maxSize },

})



module.exports = uploadFile;