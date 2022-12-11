import { Router } from "express";
import { gamesValidation } from "../../middlewares/gamesValidation.js";

import {
  createGames,
  findAllGames,
  findByName
} from "../controllers/games.controllers.js";

const gamesRouter = Router();


gamesRouter.post("/games", gamesValidation ,createGames);
gamesRouter.get("/games", gamesValidation,findAllGames);
gamesRouter.get("/games/:name", gamesValidation,findByName);

export default gamesRouter;