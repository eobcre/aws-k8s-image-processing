import { useState } from "react";

import Uploader from "./components/Uploader";
import Polaroid from "./components/Polaroid";

import type { UploadedImage } from "./type";

const App = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // upload
  const onUpload = async (selectedFile: File) => {
    try {
      setIsGenerating(true);

      // * * * s3 upload api
      // send request for file
      const formData = new FormData();
      // add file details
      formData.append("file", selectedFile);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      // validation
      if (!res.ok) {
        throw new Error("Upload failed...");
      }

      // get data
      const data = await res.json();

      // fall back image
      const previewUrl = URL.createObjectURL(selectedFile);
      // console.log("data:", data);

      // * * * caption and tags generate api
      const resGenerate = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: data.key,
        }),
      });

      const dataGenerate = await resGenerate.json();
      // console.log("dataGenerate:", dataGenerate);

      // save in state to display
      setUploadedImage({
        name: selectedFile.name,
        key: data.key,
        imageUrl: data.imageUrl || previewUrl,
        // imageUrl: data.imageUrl,
        size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
        uploadedAt: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        caption: dataGenerate.caption ?? "I had so much fun today!",
        tags: dataGenerate.tags ?? ["summer", "beach", "vacation"],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-linear-to-br from-stone-100 via-rose-50 to-orange-100 px-4 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full max-w-5xl ">
        {/* left */}
        <Uploader onUpload={onUpload} isGenerating={isGenerating} />
        {/* right */}
        <Polaroid uploadedImage={uploadedImage} />
      </div>
    </div>
  );
};

export default App;
