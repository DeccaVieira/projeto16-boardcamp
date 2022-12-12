import { Router } from "express";
import { gamesValidation } from "../../middlewares/gamesValidation.js";

import { createGames, findAllGames } from "../controllers/games.controllers.js";

const gamesRouter = Router();

gamesRouter.post("/games", gamesValidation, createGames);
gamesRouter.get("/games", findAllGames);

export default gamesRouter;
