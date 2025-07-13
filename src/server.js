import express from "express";
import dotenv from "dotenv";
import { ACTION } from "./constatn.js";
import authRouter from "../src/routers/authRoutes.js";

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const PORT = process.env.PORT || 8080;

console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('DB_URL:', process.env.DB_URL ? 'Set' : 'Not set');

app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.send(`Welcome to ${ACTION.APP_NAME}`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
