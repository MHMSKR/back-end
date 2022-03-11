module.exports = function(app) {
    const user = require('../controllers/user.controller.js')
    const middleWare = require('../middleware/auth')
    const energy = require('../controllers/energy.controller')

    // Manage User Api
    app.post('/register', middleWare.register, user.register) // Register API
    app.post('/login', user.login)
        // app.get('/me', middleWare.Auth, user.list)
        // app.put('/me/update/profile', user.updateProfile)
        // app.patch('/me/update/password', user.updatePassword)
        // app.patch('/me/update/profile/image', user.updateImageProfile)


    // Manage Energy Api
    app.get('/me/energy', energy.energyRealtime)
        // app.get('/me/history', energy.history)
}