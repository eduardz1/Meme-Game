import passport from "passport";
import { UserDao } from "../dao/userDAO";
import { LocalStrategy } from "passport-local";

class Authenticator {
  constructor(app) {
    this.app = app;
    this.dao = new UserDao();
    this.initAuth();
  }

  initAuth() {
    this.app.use({
      secret: "Samurai Jack!",
      resave: false,
      saveUninitialized: false,
    });

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.use(
      new LocalStrategy((username, password, done) => {
        this.dao
          .getUserByEmail(username)
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Invalid username" });
            }
            if (user.password !== password) {
              return done(null, false, { message: "Invalid password" });
            }
            return done(null, user);
          })
          .catch((err) => done(err));
      }),
    );
    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser((email, done) =>
      this.dao.getUserByEmail(email).then((user) => done(null, user)),
    );
  }

  login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  }

  logout(req, res) {
    req.logout();
    res.json({ message: "Logged out" });
  }
}

export default Authenticator;
