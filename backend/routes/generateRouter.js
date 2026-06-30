import express from "express";

const router = express.Router();

// * * * generate api
router.post("/generate", async (req, res) => {
  try {
    const { key } = req.body;
    console.log("req.body:", req.body);

    if (!key) {
      return res.status(400).json({ error: "Image key is required..." });
    }

    res.json({
      caption: "Spent the day at the beach and loved every moment.",
      tags: ["summer", "beach", "vacation"],
    });
  } catch (error) {
    console.error("Generate error...", error);
    res.status(500).json({ error: "Failed to generate..." });
  }
});

export default router;
