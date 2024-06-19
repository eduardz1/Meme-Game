import express from "express";

class GameRoutes {
  constructor(authenticator) {
    this.authenticator = authenticator;
    this.router = express.Router();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  initRoutes() {
    this.router.get("/", (req, res) => {
      res.json({ message: "Game route" });
    });
  }
}

export default GameRoutes;
