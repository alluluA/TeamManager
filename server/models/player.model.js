const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"Player name is required!"],
        minlength: [2, "Player name should be at least 2 characters"]
    },

    pref : {
        type: String,
        default: '------'
    },    
    state : {
        type: String,
        required:[true,"Player State is required!"],
        default: 'undecided',
    },

}, { timestamps: true});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;