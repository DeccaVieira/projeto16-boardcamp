import { connectionDB } from "../database/db.js";

async function createCategory(req, res) {
  const { name } = req.body;

  try {
    const checkName = await connectionDB.query(
      ` SELECT * FROM categories WHERE name = $1`,
      [name]
    );
    if (checkName.rows.length !== 0) {
      console.log(checkName.rows);
      return res.sendStatus(409);
    }
    if (name.length <= 0) {
      return res.sendStatus(400);
    }

    await connectionDB.query(`INSERT INTO categories(name) VALUES ($1)`, [
      name,
    ]);

    return res.sendStatus(201);
  } catch {
    return res.status;
  }
}

async function findAllCategories(req, res) {
  const { rows } = await connectionDB.query(`SELECT * FROM categories`);
  return res.send(rows);
}

export { createCategory, findAllCategories };
