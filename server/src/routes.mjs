import morgan from "morgan";
import express from "express";

/**
 * Initialize routes
 * @param {express.Application} app - Express application
 */
function initRoutes(app) {
  app.use(morgan("dev"));
  app.use(express.json({ limit: "25mb" }));
}

export default initRoutes;
