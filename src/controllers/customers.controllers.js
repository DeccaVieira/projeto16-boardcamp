import { connectionDB } from "../database/db.js";

export async function createCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const checkCpf = await connectionDB.query(
    ` SELECT * FROM customers WHERE cpf = $1`,
    [cpf]
  );
  if (checkCpf.rows.length !== 0) {
    return res.sendStatus(409);
  }
  await connectionDB.query(
    `INSERT INTO customers(name, phone, cpf, birthday) VALUES ($1, $2,$3,$4)`,
    [name, phone, cpf, birthday]
  );
  return res.sendStatus(201);
}
export async function findAllCustomers(req, res) {
  const { cpf } = req.query;
  try {
    if (cpf) {
      const customer = await connectionDB.query(
        `
    SELECT * FROM customers 
    WHERE cpf ILIKE $1`,
        [`${cpf}%`]
      );
      console.log(cpf);
      return res.send(customer.rows);
    }

    const customers = await connectionDB.query(`SELECT * FROM customers`);
    res.send(customers.rows);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }
}

export async function findCustomerId(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1;",
      [id]
    );

    if (rows.length === 0) {
      res.sendStatus(404);
    }

    return res.send(rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
export async function updateCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try {
    await connectionDB.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
      [name, phone, cpf, birthday, id]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
