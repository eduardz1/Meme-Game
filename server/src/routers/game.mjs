import express from "express";
import GameDao from "../dao/game.mjs";
import { body, param } from "express-validator";

class GameRoutes {
  constructor(authenticator) {
    this.dao = new GameDao();
    this.authenticator = authenticator;
    this.router = express.Router();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  initRoutes() {
    this.router.get(
      "/:id",
      this.authenticator.isLoggedIn,
      param("id").isInt(),
      (req, res) => {
        this.dao
          .getGame(req.params.id)
          .then((game) => {
            res.json(game);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }
    );

    this.router.post(
      "/",
      this.authenticator.isLoggedIn,
      body("userId").isInt(),
      body("rounds").isArray().isLength({ min: 1, max: 10 }),
      body("rounds.*.idGame").isInt(),
      body("rounds.*.idMeme").isInt(),
      body("rounds.*.idCaption").isInt(),
      body("rounds.*.score").isInt(),
      (req, res) => {
        this.dao
          .saveGame(req.body.userId, req.body.rounds)
          .then((game) => {
            res.json(game);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }
    );
  }
}

export default GameRoutes;
