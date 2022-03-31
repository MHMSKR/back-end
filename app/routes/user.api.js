const router = require('express').Router();
const user = require('../controllers/user.controller')


router.use('/energy', require('./eng.api'))

// Manage User Api
router.get('/', user.me)
router.put('/update-password', user.updatePassword);
router.post('/image-profile', user.updateImageProfile);

module.exports = router