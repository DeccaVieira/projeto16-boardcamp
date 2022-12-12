import { Router } from "express";
import {
  createRentals,
  findAllRentals,
  removeRental,
  findByCustomer, 
  findByGame,
  endRental
  //updateRentals,
} from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", createRentals);
rentalsRouter.get("/rentals", findAllRentals);
rentalsRouter.get("/rentals/:customerid", findByCustomer);
rentalsRouter.get("/rentals/:gameId", findByGame);
rentalsRouter.post("/rentals/:id/return",endRental);
rentalsRouter.delete("/rentals/:id",removeRental);

export default rentalsRouter;
