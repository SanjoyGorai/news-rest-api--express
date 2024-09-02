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

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  body("email").trim().isEmail().withMessage("Please enter a valid email"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export default validateUser;
