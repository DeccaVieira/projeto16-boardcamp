import { Router } from "express";
import {
  createRentals,
  findAllRentals,
  //updateRentals,
} from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", createRentals);
rentalsRouter.get("/rentals", findAllRentals);
rentalsRouter.get("/rentals/:id", findAllRentals);
rentalsRouter.get("/rentals/:gameId", findAllRentals);
rentalsRouter.post("/rentals/:id/return");

export default rentalsRouter;
