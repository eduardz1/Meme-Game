import express from "express";
import { body, query } from "express-validator";
import GameDao from "../dao/game.mjs";
import ErrorHandler from "../errors/ErrorHandler.mjs";

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
     * Fetches all games for a user, ordered by date ascending
     * @route GET /api/games?limit={limit}&offset={offset}
     * @returns {Array.<Object>} 200 - Array of games
     */
    this.router.get(
      "/",
      this.authenticator.isLoggedIn,
      query("limit").optional({ values: "falsy" }).isInt(),
      query("offset").optional({ values: "null" }).isInt({ min: 0 }),
      this.errorHandler.validate,
      (req, res, next) => {
        try {
          const games = GameDao.getGames(
            req.user.id,
            req.query.limit || null,
            req.query.offset || null,
          );
          res.json(games);
        } catch (err) {
          next(err);
        }
      },
    );

    /**
     * Records a new game
     * @route POST /api/games
     * @body {number} idUser - User ID
     * @body {Array} rounds - Array of rounds
     * @body {number} rounds.*.idMeme - Meme ID
     * @body {number} rounds.*.idCaption - Caption ID
     * @body {number} rounds.*.score - Score
     * @returns {Object} 200 - Game object
     */
    this.router.post(
      "/",
      this.authenticator.isLoggedIn,
      body("rounds").isArray().isLength({ gt: 0 }),
      body("rounds.*.idMeme").isInt(),
      body("rounds.*.idCaption").optional({ values: "null" }).isInt(),
      body("rounds.*.score").isInt(),
      this.errorHandler.validate,
      (req, res, next) => {
        try {
          const game = GameDao.recordGame(req.user.id, req.body.rounds);
          res.status(201).json(game);
        } catch (err) {
          next(err);
        }
      },
    );
  }
}

export default GameRoutes;
