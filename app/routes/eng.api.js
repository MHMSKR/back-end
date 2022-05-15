const router = require('express').Router();
const eng = require('../controllers/energy.controller')
// const { enegyCheckById } = require('../middleware/energy.mdw')

// Manage User Api
router.get('/', eng.energyRealtime)
// router.get('/:id',enegyCheckById,eng.energyRealtimeById)

module.exports = router