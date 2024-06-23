import express from "express";
import { query } from "express-validator";
import MemeDao from "../dao/meme.mjs";
import ErrorHandler from "../errors/ErrorHandler.mjs";

/**
 * Class representing the meme routes
 */
class MemeRoutes {
  constructor() {
    this.errorHandler = new ErrorHandler();
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
     * Fetches a random meme
     * @route GET /api/memes/random
     * @query {number} count.query.required - Number of memes to fetch
     * @returns {Object[]} 200 - Array of memes
     */
    this.router.get(
      "/random",
      query("count").isInt({ gt: 0 }),
      this.errorHandler.validate,
      (req, res, next) => {
        try {
          const memes = MemeDao.getRandomMemes(req.query.count);
          res.json(memes);
        } catch (err) {
          next(err);
        }
      },
    );
  }
}

export default MemeRoutes;
