import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authMiddleware from "../middleware/auth.js";

const app = express();

const initExpress = () => {
  app.use(express.json());
  app.use(express.static("./src/public"));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(authMiddleware);

  app.set("views", "./src/views");

  dotenv.config();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("Servidor rodando: http://localhost:" + PORT);
  });

  return app;
};

export default initExpress;
