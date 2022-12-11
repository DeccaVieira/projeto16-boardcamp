import { Router } from "express";
import {
  createCustomers,
  findAllCustomers,
  findCustomerId,
  updateCustomers
} from "../controllers/customers.controllers.js";

const customersRouter = Router();

customersRouter.post("/customers", createCustomers);
customersRouter.get("/customers", findAllCustomers);
customersRouter.get("/customers/:id", findCustomerId);
customersRouter.patch("/customers", updateCustomers);

export default customersRouter;