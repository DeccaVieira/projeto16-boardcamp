import express, { application } from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const {Pool} = pkg;
const app = express();
app.use(express.json());
const connect = new Pool ({
  host:'localhost',
  port: 5432,
  user:'postgres',
  password:'0909',
  database: 'boardcamp'
})



app.listen(4000, () => {
  console.log("Server running in port 4000")
})