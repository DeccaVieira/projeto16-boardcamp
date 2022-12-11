import { gamesSchema } from "../models/games.models.js";

export function gamesValidation(req, res, next){
  const {name, stockTotal,pricePerDay}=req.body;

  const game = {
    name,stockTotal,pricePerDay
  };

  const {error}= gamesSchema.validate(game, {abotEarly:false});
  
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.sendStatus(400);
}
res.locals.game = game;

next();
}