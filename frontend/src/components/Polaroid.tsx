import ImageOutlineIcon from "@iconify-react/material-symbols/image-outline";

const Polaroid = () => {
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
};

export default Polaroid;
