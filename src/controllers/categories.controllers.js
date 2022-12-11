import { connectionDB } from "../database/db.js";


async function createCategory(req, res) {
  const { name } = req.body;

try{
  
  if(name.length <= 0){
    return res.sendStatus(400)
  }

  await connectionDB.query(`INSERT INTO categories(name) VALUES ($1)`, [name]);
  if(categories.find(name)){
    res.sendStatus(409);
  }
  return res.sendStatus(201);
}
catch{
  res.status
}
}


async function findAllCategories(req, res) {
  const {rows} = await connectionDB.query(`SELECT * FROM categories`);
    res.send(rows);
}

export { createCategory, findAllCategories };
