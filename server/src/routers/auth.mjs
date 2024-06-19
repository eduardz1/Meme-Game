import express from "express";
import { body } from "express-validator";
import passport from "passport";

class AuthRoutes {
  constructor(authenticator) {
    this.authenticator = authenticator;
    this.router = express.Router();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  initRoutes() {
    this.router.post(
      "/",
      body("email").trim().isEmail(),
      body("password").isString().notEmpty({ ignore_whitespace: true }),
      this.authenticator.login,
    );

    this.router.delete("/", this.authenticator.logout);

    this.router.get("/current", this.authenticator.isLoggedIn, (req, res) =>
      res.json(req.user),
    );
  }
}

export default AuthRoutes;
