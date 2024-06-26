import express from "express";
import { body } from "express-validator";
import UserDAO from "../dao/user.mjs";
import ErrorHandler from "../errors/ErrorHandler.mjs";

/**
 * Class representing the authentication routes
 */
class AuthRoutes {
  constructor(authenticator) {
    this.authenticator = authenticator;
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
     * Authenticates the user
     * @route POST /api/sessions
     * @body {string} email - User email
     * @body {string} password - User password
     * @returns {Object} 201 - User object
     */
    this.router.post(
      "/",
      body("email").trim().isEmail(),
      body("password").isString().notEmpty({ ignore_whitespace: true }),
      this.errorHandler.validate,
      this.authenticator.login,
    );

    /**
     * Logs out the user
     * @route DELETE /api/sessions/current
     */
    this.router.delete("/current", this.authenticator.logout);

    /**
     * Fetches the current logged-in user
     * @route GET /api/sessions/current
     * @returns {Object} 200 - User object
     */
    this.router.get(
      "/current",
      this.authenticator.isLoggedIn,
      this.updateUserTotalScore,
      (req, res) => res.json(req.user),
    );
  }

  /**
   * Middleware to fetch the latest score of the user (it
   * might have changed since the last time the user logged in)
   * @param {express.Request} req - Express request
   * @param {express.Response} res - Express response
   * @param {Function} next - The next function
   */
  updateUserTotalScore(req, res, next) {
    try {
      const totalScore = UserDAO.getTotalScore(req.user.id);
      req.user.totalScore = totalScore;
      next();
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest score" });
    }
  }
}

export default AuthRoutes;
