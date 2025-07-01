import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/user.route.js";

dotenv.config();
const URI= process.env.MONGODB_URI 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

const startServer = async () => {
  await connectDB(URI);
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`);
  });
};

startServer();
