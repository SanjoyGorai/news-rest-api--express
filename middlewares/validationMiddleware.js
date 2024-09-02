// src/middlewares/validationMiddleware.js
import { body, validationResult } from "express-validator";

export const validateNews = [
  body("author").isString().trim().escape(),
  body("title").isString().trim().escape(),
  body("imageUrl").isURL(),
  body("content").isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
