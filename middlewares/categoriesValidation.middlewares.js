import { categoriesSchema } from "../models/categories.models.js";

export function categoriesValidation(req, res, next){
  const {name}=req.body;

  const category = {
    name,
  };

  const {error}= categoriesSchema.validate(category, {abotEarly:false});
  
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.sendStatus(400);
}
res.locals.category = category;

next();
}