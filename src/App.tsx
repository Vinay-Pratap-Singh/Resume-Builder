import React from "react";
import mainImage from "./assets/mainImage.jpg";
import featuresImage from "./assets/features.jpg";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <header id="home" className="">
        {/* adding the navigation menu */}
        <Navbar />

        {/* creating the main section */}
        <div className="flex items-center justify-between gap-10 my-10 mx-24">
          {/* section for the platform details */}
          <main className="w-26rem">
            <p className="text-gray-600 font-medium ">Elevate your potential</p>
            <h1 className="text-5xl font-bold my-5 leading-snug">
              Put your <span className="text-teal-500">dream career</span>{" "}
              within reach.
            </h1>
            <p className="font-medium text-gray-600">
              Elevate your job application with our cutting-edge online resume
              builder. Craft a polished and professional resume that captures
              attention. Start building your impressive resume today!
            </p>
            <button
              type="button"
              className="mt-10 bg-teal-500 rounded-full px-5 py-2 text-white font-bold hover:bg-teal-600 transition-all duration-200 ease-in-out"
            >
              Get Started <span className="text-xl">&#8250;</span>
            </button>
          </main>

          {/* adding the main image */}
          <img src={mainImage} alt="home page" className="w-[30rem]" />
        </div>
      </header>

      {/* creating the features section */}
      <section className="flex items-center justify-between mx-24">
        {/* adding the features image */}
        <img src={featuresImage} alt="feature section" className="w-[30rem]" />

        {/* creating the features */}
        <div className="w-[26rem] space-y-5">
          <p className="text-gray-600 font-medium ">
            Free online resume builder
          </p>
          <h1 className="text-2xl font-bold">
            Powerful Features to Boost Your Resume
          </h1>
          <p className="font-semibold text-gray-600">
            Elevate your job application with our cutting-edge online resume
            builder. Craft a polished and professional resume that captures
            attention. Start building your impressive resume today!
          </p>
          <ul className="font-medium text-gray-600 list-disc pl-4">
            <li>Customizable Templates</li>
            <li>Easy Editing and Formatting</li>
            <li>One-Click Download</li>
            <li>Privacy and Security</li>
          </ul>
          <button
            type="button"
            className="bg-teal-500 rounded-full px-5 py-2 text-white font-bold hover:bg-teal-600 transition-all duration-200 ease-in-out"
          >
            Build a resume <span className="text-xl">&#8250;</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default App;
