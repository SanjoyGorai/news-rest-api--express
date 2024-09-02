import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

const uploadsDir = "./uploads";

// Multer setup
const storage = multer.memoryStorage(); // Use memory storage for direct processing
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept image only
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"), false);
    }
    cb(null, true);
  },
});

// Ensure uploads directory exists
const ensureUploadsDirExists = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
};

export default upload;
