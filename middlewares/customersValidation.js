import { customersSchema } from "../models/customers.models.js";

export function customersValidation(req, res, next){
  const {cpf, phone,name, birthday}=req.body;

  const customer = {
    cpf, phone,name, birthday
  };

  const {error}= customersSchema.validate(customer, {abotEarly:false});
  
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.sendStatus(400);
}
res.locals.customer = customer;

next();
}