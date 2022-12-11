import { connectionDB } from "../database/db.js";

export async function findAllGames(req, res) {
  const {name} = req.query;
  console.log(name);
  try{
 
  const games = await connectionDB.query(`
  SELECT games.*, categories.name as "nameCategory" FROM games JOIN categories ON games."categoryId" = categories.id`);
  return res.send(games.rows);
}catch (err){
res.status(500).send(err.message)
}
}
export async function findByName(req,res){
  const {name} = req.query;
  console.log(name);
try{
  const game = await connectionDB.query(`
  SELECT games.*, categories.name as "nameCategory" 
  FROM games JOIN categories ON games."categoryId" = categories.id 
  WHERE games.name LIKE "name%"`, [name]);
 return res.send(game.rows);
}catch (err){
  res.status(500).send(err.message)
  }
}
export async function createGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
try{
  await connectionDB.query(
    `INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2,$3,$4,$5)`,
    [name, image, stockTotal, categoryId, pricePerDay]
  );
  return res.status(201);
}catch (err){
  res.status(500).send(err.message)
  }
}
