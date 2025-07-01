import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";
import tagRouter from "./routes/tag.route.js";
// import analyticRouter from "./routes/analyticEndPoints.js";


dotenv.config();
const URI= process.env.MONGODB_URI 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/tags", tagRouter);
// app.use("/api/analytics", analyticRouter);

const startServer = async () => {
  await connectDB(URI);
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`);
  });
};

startServer();
