import ImageOutlineIcon from "@iconify-react/material-symbols/image-outline";

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white text-center border-2 border-dashed border-gray-300 rounded-2xl shadow-sm p-6 w-full max-w-md">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex justify-center items-center bg-gray-100 rounded-full w-14 h-14">
            <ImageOutlineIcon className="text-gray-600 w-8" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Upload your image</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, or JPEG up to 5MB</p>
          </div>

          <label className="bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg cursor-pointer mt-3 px-4 py-2">
            Choose File
            <input type="file" accept="image/png, image/jpeg" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
