const mongoose = require('mongoose');

const BoardGame = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String},
        playTime: {Type: Number},
        minPlayers: {type: Number},
        maxPlayers: {type: Number},
        owner: {type: String, required: true}
    },
    { collection: 'user-boardgame-data'}

)

const model = mongoose.model('BoardGameData', BoardGame);

module.exports = model;