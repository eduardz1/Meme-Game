import cors from "cors";
import "dotenv/config";
import express from "express";
import initRoutes from "./src/routes.mjs";

const app = new express();

const port = 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

initRoutes(app);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
