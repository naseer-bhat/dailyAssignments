import express from "express";
import router from "./routes/product.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const URI = process.env.DBURI;
mongoose
  .connect(URI)
  .then(() => {
    console.log(`connected to db`);
  })
  .catch(() => {
    console.log(`db connection error`);
  });

const port = 3000;
app.use("/api", router);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
