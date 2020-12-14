const Player = require("../models/player.model");

module.exports.findAllPlayers = (req, res) => {
    Player.find()
    .then(allPlayers => res.json({Players: allPlayers}))
    .catch(err => res.json({ message: "Something went wrong", error: err}));
};

module.exports.finedOnePlayer = (req, res) => {
    Player.findOne({ _id: req.params.id })
    .then(onePlayer => res.json({ Player: onePlayer }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewPlayer = (req, res) => {
    const { name, pref, state } = req.body;
    Player.create({
        name,
        pref,
        state
    })
    .then(newPlayer => res.json({ Player: newPlayer }))
    .catch(err => res.json({ message: "Something went wrong", error: err}));
};

module.exports.updatePlayer = (req, res) => {
    Player.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(updatedPlayer => res.json({ Player: updatedPlayer }))
    .catch(err => res.json({ message: "Something went wrong", error: err}));
};

module.exports.deletePlayer = (req, res) => {
    Player.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result}))
    .catch(err => res.json({ message: "Something went wrong", error: err}));
};