import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import uploadRouter from "./routes/uploaderRouter.js";
import generateRouter from "./routes/generateRouter.js";

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

// routers
app.use("/api", uploadRouter);
app.use("/api", generateRouter);

// * * * server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
