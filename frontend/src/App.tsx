import ImageOutlineIcon from "@iconify-react/material-symbols/image-outline";

const App = () => {
  return (
    <div className="flex justify-center items-center bg-linear-to-br from-stone-100 via-rose-50 to-orange-100 px-4 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full max-w-5xl ">

        {/* left */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.3em] text-rose-400 uppercase">AI Caption Studio</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-3">Turn your photo into a caption-ready post.</h1>
            <p className="text-sm text-gray-500 leading-6 mt-3">Upload an image and let AI generate a caption and hashtags for your post.</p>
          </div>

          <label className="group flex flex-col justify-center items-center border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/60 hover:bg-rose-50 rounded-3xl cursor-pointer transition-all p-10">
            <div className="bg-white shadow-sm flex justify-center items-center rounded-full group-hover:scale-105 transition-transform mb-4 w-16 h-16 ">
              <ImageOutlineIcon className="text-rose-400 w-9 h-9" />
            </div>

            <p className="text-sm font-semibold text-gray-800">Choose an image</p>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, JPEG up to 5MB</p>
          </label>

          <div className="bg-white border text-sm text-gray-500 rounded-2xl mt-6 p-4">Generating AI caption...</div>
        </div>

        {/* right */}
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
      </div>
    </div>
  );
};

export default App;
