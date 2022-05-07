const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

router.post('/', loginController.handleLogin);

module.exports = router;