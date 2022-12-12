import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

export async function findAllRentals(req, res) {
      try{
   const rentals = await connectionDB.query(`
  SELECT rentals.*, games.id, games.name, games."categoryId", categories.name,customers.id, customers.name FROM rentals
  JOIN customers ON  customers.id = rentals."customerId" 
  JOIN games ON rentals."gameId" = games.id
  JOIN categories ON  categories.id = games."categoryId"    
  `);
  return res.send(rentals.rows);
}catch (err){
res.status(500).send(err.message)
}
}

export async function createRentals(req, res) {
  const {customerId, gameId, daysRented} = req.body;
const rentDate = dayjs();

try{
  const originalPrice = await connectionDB.query(
          `SELECT * FROM rentals JOIN games ON rentals."gameId"=games.id
       WHERE "originalPrice" = ("daysRented" + games."pricePerDay")`);

    await connectionDB.query(`INSERT INTO rentals  ("customerId", "gameId", "daysRented", "rentDate","originalPrice") VALUES ($1, $2,$3,$4,$5)`,
    [customerId, gameId, daysRented,rentDate, originalPrice]
  );
  return res.status(201);
}catch (err){
  res.status(500).send(err.message)
  }
}