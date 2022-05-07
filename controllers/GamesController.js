const User = require("../db/models/user.models");
const BoardGame = require("../db/models/boardGame.models");
const jwt = require('jsonwebtoken');

//get all reques request
const getAllGames = async (req, res) => {

    const cookies = req.cookies;

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken});


    if(!foundUser) return res.sendStatus(403);
    
    try {
        const result = await BoardGame.find({owner: foundUser._id}, "name description maxPlayers minPlayers").exec();

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    
}

//create new game
const createNewGame = async (req, res) => {

    console.log(req.body);
    if (!req?.body?.name) {
        return res.status(400).json({ 'message': 'At least name the game' });
    }

    const cookies = req.cookies;

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken});

    if(!foundUser) return res.sendStatus(403);
    
    try {
        const result = await BoardGame.create({
            name: req.body.name,
            description: req.body.description,
            playTime: req.body.playTime,
            minPlayers: req.body.minPlayers,
            maxPlayers: req.body.maxPlayers,
            owner: foundUser._id
        });

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = { getAllGames, createNewGame };