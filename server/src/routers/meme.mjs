import express from "express";
import { body } from "express-validator";
import MemeDao from "../dao/meme.mjs";

class MemeRoutes {
  constructor() {
    this.dao = new MemeDao();
    this.router = express.Router();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  initRoutes() {
    this.router.get(
      "/random",
      body("count").isInt({ min: 1, max: 10 }).toInt(),
      async (req, res) => {
        const meme = this.dao.getRandomMemes(req.body.count);
        res.json(meme);
      },
    );
  }
}

export default MemeRoutes;
