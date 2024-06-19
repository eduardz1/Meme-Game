import express from "express";
import { param, query } from "express-validator";
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
      query("count").isInt({ min: 1, max: 10 }).toInt(),
      async (req, res) => {
        this.dao
          .getRandomMemes(req.query.count)
          .then((memes) => {
            res.json(memes);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      },
    );

    this.router.get("/:id", param("id").isInt(), async (req, res, next) => {
      this.dao
        .getMeme(req.params.id)
        .then((meme) => {
          res.json(meme);
        })
        .catch((err) => {
          next(err);
        });
    });

    this.router.get(
      "/:id/captions/correct",
      param("id").isInt(),
      query("count").isInt({ min: 1, max: 10 }).toInt(),
      async (req, res, next) => {
        this.dao
          .getCorrectCaptions(req.params.id, req.query.count)
          .then((captions) => {
            res.json(captions);
          })
          .catch((err) => {
            next(err);
          });
      },
    );

    this.router.get(
      "/:id/captions/incorrect",
      param("id").isInt(),
      query("count").isInt({ min: 1, max: 10 }).toInt(),
      async (req, res, next) => {
        this.dao
          .getIncorrectCaptions(req.params.id, req.query.count)
          .then((captions) => {
            res.json(captions);
          })
          .catch((err) => {
            next(err);
          });
      },
    );
  }
}

export default MemeRoutes;
