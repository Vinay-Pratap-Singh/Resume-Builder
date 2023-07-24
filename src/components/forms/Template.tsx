import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

const Template: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // function to handle the previous button
  const handlePreviousBtn = () => {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="m-auto text-center space-y-10">
      <h1 className="font-bold text-2xl">Choose any template</h1>
      <header className="flex items-center justify-center flex-wrap gap-10">
        <div className="h-80 w-72 shadow-md font-semibold flex items-center justify-center">
          Template 1
        </div>
        <div className="h-80 w-72 shadow-md font-semibold flex items-center justify-center">
          Template 2
        </div>
        <div className="h-80 w-72 shadow-md font-semibold flex items-center justify-center">
          Template 3
        </div>
      </header>

      {/* button to submit the form */}
      <footer className="w-full flex items-center justify-center gap-2">
        <button
          type="button"
          className="border-2 border-black px-5 py-2 rounded-md font-bold"
          onClick={handlePreviousBtn}
        >
          Back
        </button>
        <Link to="/preview">
          <button
            type="submit"
            className="bg-teal-600 border-2 border-teal-600 text-white px-5 py-2 rounded-md font-bold"
          >
            Create Resume
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default Template;
