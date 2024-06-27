import express from "express";
import { param, query } from "express-validator";
import CaptionDAO from "../dao/caption.mjs";
import ErrorHandler from "../errors/ErrorHandler.mjs";

/**
 * Class representing the caption routes
 */
class CaptionRoutes {
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
     * Fetches a random set of captions for a meme
     * @route GET /api/captions/random?idMeme={idMeme}
     * @query {number} id.path.required - Meme ID
     * @returns {Object[]} 200 - Array of captions
     */
    this.router.get(
      "/random",
      query("idMeme").isInt(),
      this.errorHandler.validate,
      (req, res, next) => {
        try {
          const captions = CaptionDAO.getRandomCaptionsForMeme(
            req.query.idMeme,
          );
          res.json(captions);
        } catch (err) {
          next(err);
        }
      },
    );

    /**
     * Validates a caption for a meme
     * @route GET /api/captions/{id}/{idMeme}
     * @param {number} id.path.required - Caption ID
     * @param {number} idMeme.path.required - Meme ID
     * @returns {Object[]} 200 - True if the caption is correct, false otherwise
     */
    this.router.get(
      "/:id/:idMeme",
      param("id").isInt(),
      param("idMeme").isInt(),
      this.errorHandler.validate,
      (req, res, next) => {
        try {
          const bool = CaptionDAO.validateCaption(
            req.params.id,
            req.params.idMeme,
          );
          res.json(bool);
        } catch (err) {
          next(err);
        }
      },
    );
  }
}

export default CaptionRoutes;
