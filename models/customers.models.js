import Joi from "joi";

export const customersSchema = Joi.object({
  cpf: Joi.string().required().length(11),
  phone: Joi.string().required().min(10).max(11),
  name: Joi.string().required().min(1),
  birthday: Joi.date().required(),
});
