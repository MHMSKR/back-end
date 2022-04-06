const router = require('express').Router();
const middleWare = require('../middleware/auth.mdw')


// Manage User Api
router.post('/register', middleWare.register) // Register API
router.post('/login', middleWare.Login) // Login Api 

// api password
// router.post('/forgot-password', middleWare.forgotPassword, middleWare.sendLink) // get email from user and find email already exist 
// router.post('/reset-password/:id/:token') // reset password by id

module.exports = router