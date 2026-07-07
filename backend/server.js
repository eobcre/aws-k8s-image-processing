import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRouter from "./routes/uploaderRouter.js";
import generateRouter from "./routes/generateRouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    // prod
    origin: process.env.BASE_URL,
    // local
    // origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(express.json());

const PORT = process.env.PORT;

// routers
app.use("/api", uploadRouter);
app.use("/api", generateRouter);

// server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

app.get("/", (req, res) => {
  res.send("Backend API is running");
});
