import ImageOutlineIcon from "@iconify-react/material-symbols/image-outline";

type UploadProps = {
  onUpload: (selectedFile: File) => Promise<void>;
  isGenerating: boolean;
  loadingMessages: string[];
};

const Uploader = ({ onUpload, isGenerating, loadingMessages }: UploadProps) => {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // access to file list - file
    const selectedFile = e.target.files?.[0];
    // console.log("e.target.files", e.target.files);
    // console.log("selectedFile:", selectedFile);

    // validation
    if (!selectedFile) return;

    await onUpload(selectedFile);

    // reset
    e.target.value = "";
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.3em] text-rose-400 uppercase">AI Caption Studio</p>
        <h1 className="text-3xl font-bold text-gray-900 mt-3">Turn your photo into a caption-ready post.</h1>
      </div>

      <label className="group flex flex-col justify-center items-center border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/60 hover:bg-rose-50 rounded-3xl cursor-pointer transition-all p-10">
        <div className="bg-white shadow-sm flex justify-center items-center rounded-full group-hover:scale-105 transition-transform mb-4 w-16 h-16 ">
          <ImageOutlineIcon className="text-rose-400 w-9 h-9" />
        </div>

        <p className="text-sm font-semibold text-gray-800">Choose an image</p>
        <p className="text-xs text-gray-500 mt-2">PNG, JPG, JPEG up to 5MB</p>

        <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={onChange} />
      </label>

      {isGenerating ? (
        <div className="bg-white text-sm text-gray-500 rounded-2xl mt-6 py-4">{loadingMessages}</div>
      ) : (
        <p className="text-sm text-gray-500 leading-6 mt-3">Upload an image and let AI generate a caption and hashtags for your post.</p>
      )}
    </div>
  );
};

export default Uploader;
