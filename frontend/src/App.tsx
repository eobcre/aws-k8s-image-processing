import { useState } from "react";

import Uploader from "./components/Uploader";
import Polaroid from "./components/Polaroid";

import type { UploadedImage } from "./type";

const App = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  // upload
  const onUpload = async (selectedFile: File) => {
    try {
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

      const previewUrl = URL.createObjectURL(selectedFile);

      // console.log("data:", data);

      // save in state to display
      setUploadedImage({
        name: selectedFile.name,
        key: data.key,
        imageUrl: data.imageUrl || previewUrl,
        // imageUrl: data.imageUrl,
        size: "5MB",
        uploadedAt: "10:30 PM",
        caption: "I had so much fun today!",
        tags: data.tags ?? ["summer", "beach", "vacation"],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-linear-to-br from-stone-100 via-rose-50 to-orange-100 px-4 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full max-w-5xl ">
        {/* left */}
        <Uploader onUpload={onUpload} />
        {/* right */}
        <Polaroid uploadedImage={uploadedImage} />
      </div>
    </div>
  );
};

export default App;
