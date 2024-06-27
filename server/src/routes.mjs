import express from "express";
import morgan from "morgan";
import Authenticator from "./auth.mjs";
import ErrorHandler from "./errors/ErrorHandler.mjs";
import AuthRoutes from "./routers/auth.mjs";
import CaptionRoutes from "./routers/caption.mjs";
import GameRoutes from "./routers/game.mjs";
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
  const captionRoutes = new CaptionRoutes();
  const memeRoutes = new MemeRoutes();
  const gameRoutes = new GameRoutes(authenticator);

  app.use(`${PREFIX}/sessions`, authRoutes.getRouter());
  app.use(`${PREFIX}/memes`, memeRoutes.getRouter());
  app.use(`${PREFIX}/captions`, captionRoutes.getRouter());
  app.use(`${PREFIX}/games`, gameRoutes.getRouter());

  ErrorHandler.register(app);
}

export default initRoutes;
