const router = require('express').Router();
const eng = require('../controllers/energy.controller')

// Manage User Api
router.get('/realtime', eng.energyRealtime)
    // router.put('/update-password', user.updateProfile)

module.exports = router