import { Router } from "express";
import { customersValidation } from "../../middlewares/customersValidation.js";
import {
  createCustomers,
  findAllCustomers,
  findCustomerId,
  updateCustomers
} from "../controllers/customers.controllers.js";

const customersRouter = Router();

customersRouter.post("/customers", customersValidation,createCustomers);
customersRouter.get("/customers", findAllCustomers);
customersRouter.get("/customers/:id" ,findCustomerId);
customersRouter.put("/customers/:id",customersValidation, updateCustomers);

export default customersRouter;