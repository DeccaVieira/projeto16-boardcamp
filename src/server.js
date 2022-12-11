import express from "express";
import cors from "cors";
import categoryRouter from "./routes/categories.routes.js";
import customersRouter from "./routes/customers.routes.js";
import gamesRouter from "./routes/games.routes.js";
//import rentalsRouter from "./routes/rentals.routes.js";
const app = express();
app.use(express.json());
app.use(cors());

app.use(categoryRouter);
app.use(customersRouter);
app.use(gamesRouter);
//app.use(rentalsRouter)

app.listen(4000, () => {
  console.log("Server running in port 4000");
});
