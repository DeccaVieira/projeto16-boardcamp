import { connectionDB } from "../database/db.js";

export async function findAllGames(req, res) {
  const games = await connectionDB.query(`
  SELECT games.*, categories.name as "nameCategory" FROM games JOIN categories ON games."categoryId" = categories.id`);
  return res.send(games.rows);
}
export async function findByName(req, res) {
  const name = req.query;
  try{
    
    if(name) {
    const game = await connectionDB.query(`
    SELECT games.*, categories.name as "nameCategory" 
    FROM games JOIN categories ON games."categoryId" = categories.id 
    WHERE game.name LIKE 'name%'`, [game.name]);
    
  }
  return res.send(game);
}catch (err){
res.status(500).send(err.message)
}
}

export async function createGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  const result = await connectionDB.query(
    `INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2,$3,$4,$5)`,
    [name, image, stockTotal, categoryId, pricePerDay]
  );
  return res.status(201);
}
