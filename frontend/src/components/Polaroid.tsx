import type { UploadedImage } from "../type";
import ImageOutlineIcon from "@iconify-react/material-symbols/image-outline";

type PolaroidProps = {
  uploadedImage: UploadedImage | null;
};

const Polaroid = ({ uploadedImage }: PolaroidProps) => {
  if (!uploadedImage) {
    return (
      <div className="flex justify-center">
        <div className="bg-white rounded-4xl shadow-xl -rotate-2 opacity-80 p-5 w-full max-w-sm ">
          <div className="flex justify-center items-center bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl aspect-square">
            <ImageOutlineIcon className="text-gray-300 w-16 h-16" />
          </div>
          <div className="text-center pt-6 pb-4 ">
            <p className="text-sm text-gray-400">Your polaroid photo will appear here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-[2rem] shadow-2xl p-5 w-full max-w-sm rotate-[-2deg]">
        <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
          <img src={uploadedImage.imageUrl} alt={uploadedImage.name} className="w-full h-full object-cover" />
        </div>

        <div className="pt-5 pb-3 px-2">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
            <span>{uploadedImage.name}</span>
            <span>{uploadedImage.uploadedAt}</span>
          </div>

          <p className="text-gray-800 text-sm leading-6 font-medium">{uploadedImage.caption}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {uploadedImage.tags.map((tag) => (
              <span key={tag} className="text-xs bg-rose-50 text-rose-500 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t flex justify-between text-xs text-gray-400">
            <span>{uploadedImage.size}</span>
            <span>AI Generated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Polaroid;
