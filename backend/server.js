import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(express.json());

const PORT = process.env.PORT;

// multer
const upload = multer({ storage: multer.memoryStorage() });

// s3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

// upload api
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // validation
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded..." });
    }
    // file name
    const fileKey = `uploads-${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }),
    );

    res.json({
      message: "Uploaded successfully!!!",
      // imageUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed..." });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
