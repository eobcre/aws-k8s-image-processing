import Polaroid from "./components/Polaroid";
import Uploader from "./components/Uploader";

const App = () => {
  return (
    <div className="flex justify-center items-center bg-linear-to-br from-stone-100 via-rose-50 to-orange-100 px-4 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 w-full max-w-5xl ">
        {/* left */}
        <Uploader />
        {/* right */}
        <Polaroid />
      </div>
    </div>
  );
};

export default App;
