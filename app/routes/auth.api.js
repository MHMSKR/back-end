const router = require('express').Router();
const middleWare = require('../middleware/auth.mdw')


// Manage User Api
router.post('/register', middleWare.register) // Register API
router.post('/login', middleWare.Login) // Login Api 
router.post('/refresh-token', middleWare.RefreshToken) // Refresh Token Api 
router.get('/generate-token',middleWare.generateToken) // Generate token for esp
// router.get('/test-get-user',middleWare.userGetTest)

module.exports = router