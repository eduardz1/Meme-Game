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
      query("count").isInt({ min: 1, max: 10 }).toInt(),
      this.errorHandler.validate,
      async (req, res, next) =>
        MemeDao.getRandomMemes(req.query.count)
          .then((memes) => res.json(memes))
          .catch((err) => next(err))
    );

    /**
     * Fetches a meme by ID
     * @route GET /api/memes/{id}
     * @param {number} id.path.required - Meme ID
     * @returns {Object} 200 - Meme object
     */
    this.router.get(
      "/:id",
      param("id").isInt(),
      this.errorHandler.validate,
      async (req, res, next) =>
        MemeDao.getMeme(req.params.id)
          .then((meme) => res.json(meme))
          .catch((err) => next(err))
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
      query("count").isInt({ min: 1, max: 10 }).toInt(),
      this.errorHandler.validate,
      async (req, res, next) =>
        MemeDao.getCorrectCaptions(req.params.id, req.query.count)
          .then((captions) => res.json(captions))
          .catch((err) => next(err))
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
      query("count").isInt({ min: 1, max: 10 }).toInt(),
      this.errorHandler.validate,
      async (req, res, next) =>
        MemeDao.getIncorrectCaptions(req.params.id, req.query.count)
          .then((captions) => res.json(captions))
          .catch((err) => next(err))
    );
  }
}

export default MemeRoutes;
