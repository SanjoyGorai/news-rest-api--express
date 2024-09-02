// src/app.js
import express from "express";
import newsRoutes from "./routes/newsRoutes.js";
import sequelize from "./config/database.js";

const app = express();

app.use(express.json());

app.use("/api/news", newsRoutes);

// Test the database connection
sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

export default app;
