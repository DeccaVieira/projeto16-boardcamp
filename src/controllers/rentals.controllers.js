import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

export async function findAllRentals(req, res) {
  try {
    const rentals = await connectionDB.query(`
  SELECT rentals.*, games.id as "gamesId", games.name as "gamesName", games."categoryId", categories.name as "categoriesName",customers.id as "customersId", customers.name as "customersName" FROM rentals
  JOIN customers ON  customers.id = rentals."customerId" 
  JOIN games ON rentals."gameId" = games.id
  JOIN categories ON  categories.id = games."categoryId"    
  `);
    return res.send(rentals.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


export async function findByCustomer(req, res) {
  const { customerId } = req.params;
  if (customerId) {
    const { rows } = await connectionDB.query(
      `SELECT * FROM rentals JOIN customers ON  customers.id = rentals."customerId" 
        WHERE id=$1;`,
      [id]
    );
    return res.send(rows[0]);
  }
}

export async function findByGame(req, res) {
  const { gameId } = req.params;

  if (customerId) {
    const { rows } = await connectionDB.query(
      `SELECT * FROM rentals JOIN games ON games.id = rentals."customerId" 
        WHERE id=$1;`,
      [id]
    );
    return res.send(rows[0]);
  }
}

export async function createRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  try {
    
    const checkCustomerId = await connectionDB.query(
      ` SELECT * FROM rentals WHERE "customerId" = $1`,
      [customerId]
    );
    if (checkCustomerId.rows.length === 0) {
      return res.sendStatus(400);
    }

    const checkGameId = await connectionDB.query(
      ` SELECT * FROM rentals WHERE "gameId" = $1`,
      [gameId]
    );

    if (checkGameId.rows.length === 0) {
      return res.sendStatus(400);
    }

    

    const returnDate = null;
    const rentDate = dayjs().format("YYYY-MM-DD");
    const delayFee = null;
    const pricePerDay = await connectionDB.query(
      `SELECT "pricePerDay" FROM games WHERE ID = $1`,
      [gameId]
    );

    const originalPrice = daysRented * pricePerDay.rows[0].pricePerDay;

    await connectionDB.query(
      `INSERT INTO rentals ("customerId",
       "gameId",
       "rentDate",
        "daysRented",
        "returnDate",
        "originalPrice",
        "delayFee") 
        VALUES ($1, $2,$3,$4,$5,$6,$7)`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    await connectionDB.query(
      `UPDATE games SET "stockTotal" = "stockTotal"-1 WHERE id=$1`,
      [gameId]
    );
    return res.status(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function removeRental(req, res) {
  const { id } = req.params;
console.log(id);
  try {
   await connectionDB.query(`DELETE from rentals WHERE id=$1`, [id]);
   return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(err.message);
  }
}

export async function endRental(req, res) {
  const { id } = req.params;
  try{
   const rentalsId = await connectionDB.query(`SELECT * from rentals WHERE id=$1`, [id]);
const rentDate = rentalsId.rows[0].rentDate
const returnDate = dayjs();
const days = returnDate.diff(rentDate, 'day');

if (rentalsId.rows[0].daysRented > days){
  await connectionDB.query(`UPDATE rentals
    SET "returnDate"=$1,"delayFee"=$2
    Where id=$3 `, [returnDate.toISOString(),0,id]
    )
}else{
  const delayFee = ((days - rentalsId.rows[0].daysRented )* (rental.rows[0].originalPrice / rental.rows[0].daysRented));
  await connectionDB.query(`UPDATE rentals
  SET "returnDate"=$1,"delayFee"=$2
  Where id=$3 `, [returnDate.toISOString(),delayFee,id])
}
console.log(days);
   res.sendStatus(201)
  }catch (error) {
    return res.status(500).send(error.message);
  }
}