const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/GamesController');

router.route('/')
    .get(gamesController.getAllGames)
    .post(gamesController.createNewGame)

module.exports = router;