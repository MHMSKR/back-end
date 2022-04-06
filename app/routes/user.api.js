const router = require('express').Router();

const user = require('../controllers/user.controller')
const file_mdw = require('../middleware/file.mdw')


router.use('/energy', require('./eng.api'))
    // Manage User Api
router.get('/', user.me)
router.put('/update-password', user.updatePassword);
router.put('/update-profile', user.updateProfile)
router.post('/image-profile', file_mdw.single('avatar'), user.updateImageProfile);

module.exports = router