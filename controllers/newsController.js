// src/controllers/newsController.js
import News from "../models/newsModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { processImage, deleteFile } from "../middlewares/imageProcessor.js";
import fs from "fs-extra";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { nanoid } from "nanoid";

// Manually resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = "uploads";

// Create a news article
export const createNews = async (req, res) => {
  try {
    const { author, title, content } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const outputFilePath = await processImage(req.file.buffer, uploadsDir);

    const result = await cloudinary.uploader.upload(outputFilePath, {
      folder: "news_images",
      public_id: `${nanoid()}`,
      resource_type: "image",
    });

    // Delete the local file after upload
    await deleteFile(outputFilePath);
    await deleteFile(file.path); // Also delete the original uploaded file

    // Save news in the database
    const newNews = await News.create({
      author,
      title,
      imageUrl: result.secure_url,
      content,
    });

    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error_msg: error.message });
  }
};

// Get all news articles
export const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Get a news article by ID
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (news) {
      res.status(200).json(news);
    } else {
      res.status(404).json({ message: "News not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Update a news article by ID
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, title, imageUrl, content } = req.body;
    const news = await News.findByPk(id);
    if (news) {
      await news.update({ author, title, imageUrl, content });
      res.status(200).json(news);
    } else {
      res.status(404).json({ message: "News not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating news", error });
  }
};

// Delete a news article by ID
export const deleteNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (news) {
      await news.destroy();
      res.status(200).json({ message: "News deleted" });
    } else {
      res.status(404).json({ message: "News not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};

// Delete all news articles
export const deleteAllNews = async (req, res) => {
  try {
    await News.destroy({ where: {} });
    res.status(200).json({ message: "All news deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};
