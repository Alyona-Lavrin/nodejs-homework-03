import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,

  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const limits = {
  fileSize: 5e6,
};

export const upload = multer({
  storage,
  limits,
});