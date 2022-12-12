import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

export async function findAllRentals(req, res) {
  try {
    const rentals = await connectionDB.query(`
  SELECT rentals.*, games.id, games.name, games."categoryId", categories.name,customers.id, customers.name FROM rentals
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
  try {
    const checkId = await connectionDB.query(
      ` SELECT * FROM rentals WHERE name = $1`,
      [id]
    );
    if (checkId.rows.length === 0) {
      return res.sendStatus(404);
    }
    await connectionDB.query("DELETE FROM rentals WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
