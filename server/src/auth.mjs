import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import UserDao from "./dao/user.mjs";

/**
 * Class representing the authenticator
 */
class Authenticator {
  constructor(app) {
    this.app = app;
    this.initAuth();
  }

  /**
   * Initialize authentication
   */
  initAuth() {
    this.app.use(
      session({
        secret: "Samurai Jack!",
        resave: false,
        saveUninitialized: false,
      }),
    );

    this.app.use(passport.authenticate("session"));

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        (email, password, done) => {
          try {
            const user = UserDao.getUser(email, password);
            if (!user)
              return done(null, false, {
                error: "Invalid email and/or password",
              });

            return done(null, user);
          } catch (err) {
            return done(err);
          }
        },
      ),
    );

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser((user, done) => done(null, user));
  }

  /**
   * Logs in a user
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - The next function
   */
  login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);

      if (!user) return res.status(401).json(info);

      req.login(user, (err) => {
        if (err) return next(err);

        return res.status(201).json(req.user);
      });
    })(req, res, next);
  }

  /**
   * Logs out a user
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   */
  logout(req, res) {
    req.logout(() => res.status(204).end());
  }

  /**
   * Checks if a user is logged in
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - The next function
   * @returns {Function} The next function or an error response
   */
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default Authenticator;
