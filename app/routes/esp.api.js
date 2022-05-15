const router = require('express').Router();
const esp_ctrl = require('../controllers/esp.controller')

// post energy from esp32 to server
router.post('/post-data',esp_ctrl.postData);

module.exports = router