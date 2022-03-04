module.exports = function(app) {
    var user = require('../controllers/user.controller.js')
    const middleWare = require('../middleware/auth') 

    app.post('/register', user.create)
    app.post('/login',  user.login)
    app.get('/users', user.list)
    app.post('/user/update', user.update)
}
