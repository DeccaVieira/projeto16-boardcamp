import Joi from "joi";

export const gamesSchema = Joi.object({
  name: Joi.string().required().min(1),
  stockTotal: Joi.number().required().min(1),
  pricePerDay: Joi.number().required().min(1),
});
