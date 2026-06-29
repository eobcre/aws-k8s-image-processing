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
      <div className="bg-white rounded-4xl shadow-2xl -rotate-2 p-5 w-full max-w-sm">
        <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
          <img src={uploadedImage.imageUrl} alt={uploadedImage.name} className="object-cover w-full h-full" />
        </div>

        <div className="px-2 pt-5 pb-3">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
            <span>{uploadedImage.name}</span>
            <span>{uploadedImage.uploadedAt}</span>
          </div>

          <p className="text-gray-800 text-sm leading-6 font-medium">{uploadedImage.caption}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {uploadedImage.tags.map((tag) => (
              <span key={tag} className="bg-rose-50 text-xs text-rose-500 rounded-full px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-400 border-t mt-5 pt-4">
            <span>{uploadedImage.size}</span>
            <span>AI Generated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Polaroid;
