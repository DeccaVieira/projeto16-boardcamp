import {createCategory, findAllCategories} from "../controllers/categories.controllers.js"
import { Router } from "express";
import { categoriesValidation } from "../../middlewares/categoriesValidation.middlewares.js";

const categoryRouter = Router();

categoryRouter.post("/categories",categoriesValidation, createCategory);
categoryRouter.get("/categories", findAllCategories);

export default categoryRouter;