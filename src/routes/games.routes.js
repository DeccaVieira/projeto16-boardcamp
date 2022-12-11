import { Router } from "express";
import {
  createGames,
  findAllGames,
  findByName,
  
} from "../controllers/games.controllers.js";

const gamesRouter = Router();


gamesRouter.post("/games", createGames);
gamesRouter.get("/games", findAllGames);
gamesRouter.get("/games?name", findByName)

export default gamesRouter;