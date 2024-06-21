import express from "express";
import ErrorHandler from "../errors/ErrorHandler.mjs";
import GameDao from "../dao/game.mjs";
import { body, param } from "express-validator";

/**
 * Class representing the game routes
 */
class GameRoutes {
  constructor(authenticator) {
    this.errorHandler = new ErrorHandler();
    this.authenticator = authenticator;
    this.router = express.Router();
    this.initRoutes();
  }

  /**
   * @returns {express.Router} The router
   */
  getRouter() {
    return this.router;
  }

  /**
   * Initialize the routes
   */
  initRoutes() {
    /**
     * Fetches all games for a user
     * @route GET /api/games/:idUser
     * @param {number} idUser.path.required - User ID
     * @returns {Array.<Object>} 200 - Array of games
     */
    this.router.get(
      "/:idUser",
      this.authenticator.isLoggedIn,
      param("idUser").isInt(),
      this.errorHandler.validate,
      (req, res, next) => {
        GameDao.getGames(req.params.idUser)
          .then((games) => {
            res.json(games);
          })
          .catch((err) => {
            next(err);
          });
      }
    );

    /**
     * Records a new game
     * @route POST /api/games
     * @body {number} idUser - User ID
     * @body {Array} rounds - Array of rounds
     * @body {number} rounds.*.idGame - Game ID
     * @body {number} rounds.*.idMeme - Meme ID
     * @body {number} rounds.*.idCaption - Caption ID
     * @body {number} rounds.*.score - Score
     * @returns {Object} 200 - Game object
     */
    this.router.post(
      "/",
      this.authenticator.isLoggedIn,
      body("idUser").isInt(),
      body("rounds").isArray().isLength({ min: 1, max: 10 }),
      body("rounds.*.idGame").isInt(),
      body("rounds.*.idMeme").isInt(),
      body("rounds.*.idCaption").isInt(),
      body("rounds.*.score").isInt(),
      this.errorHandler.validate,
      (req, res, next) => {
        GameDao.recordGame(req.body.idUser, req.body.rounds)
          .then((game) => {
            res.json(game);
          })
          .catch((err) => {
            next(err);
          });
      }
    );
  }
}

export default GameRoutes;
