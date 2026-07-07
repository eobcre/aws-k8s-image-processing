import express from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";

const router = express.Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
});

const streamToBuffer = async (stream) => {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
};

router.post("/generate", async (req, res) => {
  try {
    const { key } = req.body;
    console.log("req.body:", req.body);

    if (!key) {
      return res.status(400).json({ error: "Image key is required..." });
    }

    const s3Response = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      }),
    );

    const imageBuffer = await streamToBuffer(s3Response.Body);

    const command = new ConverseCommand({
      modelId: process.env.MODEL_ID,
      messages: [
        {
          role: "user",
          content: [
            {
              text: `
                    Analyze this image and generate an Instagram-style caption and hashtags.
                    Return ONLY valid JSON in this format:
                    {
                        "caption": "caption text",
                        "tags": ["tag1", "tag2", "tag3"]
                    }
                    Rules:
                    - Do NOT include hashtags in the caption.
                    - Do NOT include # symbols in the caption.
                    - Tags should be separate words only.
                    `,
            },
            {
              image: {
                format: "jpeg",
                source: {
                  bytes: imageBuffer,
                },
              },
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 300,
        temperature: 0.7,
      },
    });

    const bedrockResponse = await bedrock.send(command);

    const responseText = bedrockResponse.output.message.content[0].text;

    const result = JSON.parse(responseText);

    res.json({
      caption: result.caption,
      tags: result.tags,
    });
  } catch (error) {
    console.error("Generate error:", error);
    res.status(500).json({ error: "Failed to generate caption..." });
  }
});

export default router;
