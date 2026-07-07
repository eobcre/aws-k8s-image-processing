import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromTokenFile } from "@aws-sdk/credential-providers";

const router = express.Router();

// multer
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromTokenFile(),
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // validation
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded..." });
    }

    console.log("File name:", req.file.originalname);
    console.log("Bucket:", process.env.S3_BUCKET_NAME);
    console.log("Region:", process.env.AWS_REGION);

    // file name
    const fileKey = `uploads-${Date.now()}-${req.file.originalname}`;

    console.log("Uploading to S3...");

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }),
    );

    console.log("Upload succeeded.");

    res.json({
      message: "Uploaded successfully!!!",
      key: fileKey,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed..." });
  }
});

export default router;
