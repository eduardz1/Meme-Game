import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local";
import UserDao from "./dao/user.mjs";

class Authenticator {
  constructor(app) {
    this.app = app;
    this.dao = new UserDao();
    this.initAuth();
  }

  initAuth() {
    this.app.use(
      session({
        secret: "Samurai Jack!",
        resave: false,
        saveUninitialized: false,
      }),
    );

    this.app.use(passport.authenticate("session"));

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        (email, password, done) => {
          this.dao
            .getUser(email, password)
            .then((user) => {
              if (!user) {
                return done(null, false, {
                  message: "Invalid email and/or password",
                });
              }

              return done(null, user);
            })
            .catch((err) => done(err));
        },
      ),
    );

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser((user, done) =>
      // TODO: Implement check on user in database
      // this.dao.getUserByEmail(email).then((user) => done(null, user))
      done(null, user),
    );
  }

  login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);

      if (!user) return res.status(401).json(info);

      req.logIn(user, (err) => {
        if (err) return next(err);

        return res.json(user);
      });
    })(req, res, next);
  }

  logout(req, res) {
    req.logout(() => res.end());
    res.json({ message: "Logged out" });
  }

  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default Authenticator;