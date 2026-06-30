import { useState } from "react";

import Uploader from "./components/Uploader";
import Polaroid from "./components/Polaroid";

import type { UploadedImage } from "./type";

const App = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadingMessages = ["Uploading image...", "Analyzing image...", "Generating AI caption...", "Creating hashtags...", "Finalizing results..."];

  // upload
  const onUpload = async (selectedFile: File) => {
    try {
      // * * * s3 upload api
      // send request for file
      const formData = new FormData();
      // add file details
      formData.append("file", selectedFile);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
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
      const resGenerate = await fetch(`${import.meta.env.VITE_API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: data.key,
        }),
      });

      const dataGenerate = await resGenerate.json();

      // save in state to display
      setUploadedImage({
        name: selectedFile.name,
        key: data.key,
        imageUrl: data.imageUrl || previewUrl,
        // imageUrl: data.imageUrl,
        size: selectedFile.size,
        uploadedAt: selectedFile.lastModified,
        caption:  dataGenerate.caption ?? "I had so much fun today!",
        tags: dataGenerate.tags ?? ["summer", "beach", "vacation"],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-linear-to-br from-stone-100 via-rose-50 to-orange-100 px-4 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full max-w-5xl ">
        {/* left */}
        <Uploader onUpload={onUpload} isGenerating={isGenerating} loadingMessages={loadingMessages} />
        {/* right */}
        <Polaroid uploadedImage={uploadedImage} />
      </div>
    </div>
  );
};

export default App;
