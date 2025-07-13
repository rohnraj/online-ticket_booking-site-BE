import express from "express";
import dotenv from "dotenv";
import { ACTION } from "./constatn.js";
import authRouter from "../src/routers/authRoutes.js";
// import bodyParser from "body-parser";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

// app.use(bodyParser.json());
app.use(express.json());
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.send(`Welcome to ${ACTION.APP_NAME}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
