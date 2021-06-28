const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
router.post('/Admin',authController.Admin);
router.post('/User',authController.User);
module.exports = router;