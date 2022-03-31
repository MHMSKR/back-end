const router = require('express').Router();
const middleWare = require('../middleware/auth.mdw')


// Manage User Api
router.post('/register', middleWare.register) // Register API
router.post('/login', middleWare.Login) // Login Api 
router.put('/forgot-password') // forgot password Api

module.exports = router