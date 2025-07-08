import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const metadata = [];

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `profile_${metadata.length + 1}`;
    cb(null, uniqueName);
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = [".png", ".jpeg", ".jpg"];
  const ext = path.extname(file.originalname);
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png and .jpg files are allowed"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const { originalname, filename, size } = req.file;
  const fileInfo = {
    originalName: originalname,
    savedName: filename,
    sizeKB: Math.round(size / 1024),
    uploadedAt: new Date(),
  };
  metadata.push(fileInfo);

  res.status(200).json({
    message: "File uploaded successfully.",
    filename: filename,
    url: `/uploads/${filename}`,
  });
});

app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found.");
    }
  });
});

app.get("/uploads", (req, res) => {
  res.json(metadata);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
