import morgan from "morgan";
import express from "express";
import Authenticator from "./auth.mjs";
import AuthRoutes from "./routers/auth.mjs";
import MemeRoutes from "./routers/meme.mjs";

const PREFIX = "/api";

/**
 * Initialize routes
 * @param {express.Application} app - Express application
 */
function initRoutes(app) {
  app.use(morgan("dev"));
  app.use(express.json({ limit: "25mb" }));

  const authenticator = new Authenticator(app);

  const authRoutes = new AuthRoutes(authenticator);
  const memeRoutes = new MemeRoutes();

  app.use(`${PREFIX}/sessions`, authRoutes.getRouter());
  app.use(`${PREFIX}/memes`, memeRoutes.getRouter());
}

export default initRoutes;
