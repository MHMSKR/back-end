const router = require('express').Router();
const eng = require('../controllers/energy.controller')
// const { enegyCheckById } = require('../middleware/energy.mdw')

// Manage User Api
router.get('/', eng.energyRealtime)
// router.get('/:id',eng.energyRealtimeById)
router.get('/hour',eng.hour)

module.exports = router