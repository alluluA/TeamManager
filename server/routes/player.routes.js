const PlayerController = require("../controllers/player.controller");

module.exports = app => {
    app.get("/api", PlayerController.findAllPlayers);
    app.get("/api/:id", PlayerController.finedOnePlayer);
    app.post("/api/new", PlayerController.createNewPlayer);
    app.put("/api/edit/:id", PlayerController.updatePlayer);
    app.delete("/api/delete/:id", PlayerController.deletePlayer);
};