import { validationResult } from "express-validator";

/**
 * Handles validation errors
 */
class ErrorHandler {
  /**
   * Validates the request
   * @param {Object} req - The request
   * @param {Object} res - The response
   * @param {Function} next - The next function
   */
  validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array(), message: "Unprocessable Content" });
    }
    next();
  }

  /**
   * Registers the error handler
   *
   * @param {Object} app - Express application
   */
  static register(app) {
    // eslint-disable-next-line no-unused-vars
    app.use((err, _req, res, _next) =>
      res.status(err.customCode || 503).json({
        message: err.customMessage || "Internal Server Error",
      })
    );
  }
}

export default ErrorHandler;
