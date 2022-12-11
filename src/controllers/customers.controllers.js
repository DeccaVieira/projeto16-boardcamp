import { connectionDB } from "../database/db.js";

export async function createCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  const result = await connectionDB.query(
    `INSERT INTO customers(name, phone, cpf, birthday) VALUES ($1, $2,$3,$4)`,
    [name, phone, cpf, birthday]
  );
  return res.status(201);
}
export async function findAllCustomers(req, res) {
  const customers = await connectionDB.query(`SELECT * FROM customers`);
  res.send(customers.rows);
}
export async function findCustomerId(req, res) {}
export async function updateCustomers(req, res) {}
