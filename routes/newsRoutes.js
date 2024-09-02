// src/routes/newsRoutes.js
import express from "express";
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNewsById,
  deleteAllNews,
} from "../controllers/newsController.js";
import { validateNews } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/", validateNews, createNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.put("/:id", validateNews, updateNews);
router.delete("/:id", deleteNewsById);
router.delete("/", deleteAllNews);

export default router;
