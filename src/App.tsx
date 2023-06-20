import React from "react";
import mainImage from "./assets/mainImage.jpg";

const App = () => {
  return (
    <div className="flex items-center justify-center gap-10 p-10">
      {/* section for the platform details */}
      <main className="w-96">
        <p className="text-gray-500 font-medium ">Elevate your potential</p>
        <h1 className="text-5xl font-bold my-5">
          Put your <span className="text-teal-500">dream career</span> within
          reach.
        </h1>
        <p className="font-medium">
          Stand out among job seekers with our free online resume builder. Ready
          to aspire higher?
        </p>
        <button
          type="button"
          className="mt-5 bg-teal-500 rounded-full px-5 py-2 text-white font-bold hover:bg-teal-600 transition-all duration-200 ease-in-out"
        >
          Get Started <span className="text-xl">&#8250;</span>
        </button>
      </main>

      {/* adding the main image */}
      <img src={mainImage} alt="home page" className="w-[30rem]" />
    </div>
  );
};

export default App;
