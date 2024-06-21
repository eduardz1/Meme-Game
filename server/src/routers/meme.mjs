import express from "express";
import { param, query } from "express-validator";
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
     * @returns {Array.<Object>} 200 - Array of memes
     */
    this.router.get(
      "/random",
      query("count").isInt({ gt: 0 }),
      this.errorHandler.validate,
      async (req, res, next) => {
        try {
          const memes = MemeDao.getRandomMemes(req.query.count);
          res.json(memes);
        } catch (err) {
          next(err);
        }
      }
    );

    /**
     * Fetches correct captions for a meme
     * @route GET /api/memes/{id}/captions/correct
     * @param {number} id.path.required - Meme ID
     * @query {number} count.query.required - Number of captions to fetch
     * @returns {Array.<Object>} 200 - Array of captions
     */
    this.router.get(
      "/:id/captions/correct",
      param("id").isInt(),
      query("count").isInt({ gt: 0 }),
      this.errorHandler.validate,
      async (req, res, next) => {
        try {
          const captions = MemeDao.getCorrectCaptions(
            req.params.id,
            req.query.count
          );
          res.json(captions);
        } catch (err) {
          next(err);
        }
      }
    );

    /**
     * Fetches incorrect captions for a meme
     * @route GET /api/memes/{id}/captions/incorrect
     * @param {number} id.path.required - Meme ID
     * @query {number} count.query.required - Number of captions to fetch
     * @returns {Array.<Object>} 200 - Array of captions
     */
    this.router.get(
      "/:id/captions/incorrect",
      param("id").isInt(),
      query("count").isInt({ gt: 0 }),
      this.errorHandler.validate,
      async (req, res, next) => {
        try {
          const captions = MemeDao.getIncorrectCaptions(
            req.params.id,
            req.query.count
          );
          res.json(captions);
        } catch (err) {
          next(err);
        }
      }
    );
  }
}

export default MemeRoutes;
