# AI Caption Studio

AI Caption Studio is a web application that allows users to upload images and automatically generate AI-powered captions and hashtags.

## 🧠 How It Works

1. User uploads an image.
2. Image is sent to the Node API using `FormData`.
3. Backend uploads the image to S3 and returns the file key. (e.g. uploads-1234567-001.JPG)
4. Frontend sends the file key to the AI generation endpoint.
5. Backend retrieves the image from S3 using the file key.
6. Amazon Bedrock (Nova) analyzes the image and generates: caption and relavant hash tags.
7. Generated caption and hashtags are returned to the frontend.
8. Frontend displays the image, caption and tags in a polaroid card.

## 🏗 Architecture

<p>
  <img src="./docs/architecture.png" alt="Image" width="600" />
<br />
  <sub>Architecture diagram created with Lucidchart</sub>
</p>

## 🚀 Features

- Upload images from the browser.
- Store uploaded images in Amazon S3.
- Generate AI-powered captions using Amazon Bedrock. (Nova)
- Generate relevant hash tags.
- Display results in polaroid card UI.
- Preview uploaded images instantly.
- Responsive UI

## 🛠 Tech Stack

#### ▫️ Frontend

- React
- TypeScript
- Tailwind CSS

#### ▫️ Backend / AWS

- Amazon Bedrock
- Amazon EKS
- Kurbenetes
- Node.js (API)
- Amazon S3
- Amazon CloudFront
- Terraform
- GitHub Actions

> Note: Application is managed and deployed via Terradform and GitHub Actions.

## 📦 Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/eobcre/aws-k8s-image-processing.git
cd aws-k8s-image-processing
npm install
```
