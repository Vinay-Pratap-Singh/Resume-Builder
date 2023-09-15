import { FC } from "react";
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
    <div className="m-auto space-y-10 text-center">
      <h1 className="text-2xl font-bold">Choose any template</h1>
      <header className="flex flex-wrap items-center justify-center gap-10">
        <div className="flex items-center justify-center font-semibold shadow-md h-80 w-72">
          Template 1
        </div>
        <div className="flex items-center justify-center font-semibold shadow-md h-80 w-72">
          Template 2
        </div>
        <div className="flex items-center justify-center font-semibold shadow-md h-80 w-72">
          Template 3
        </div>
      </header>

      {/* button to submit the form */}
      <footer className="flex items-center justify-center w-full gap-2">
        <button
          type="button"
          className="px-5 py-2 font-bold border-2 border-black rounded-md"
          onClick={handlePreviousBtn}
        >
          Back
        </button>
        <Link to="/preview">
          <button
            type="submit"
            className="px-5 py-2 font-bold text-white bg-teal-600 border-2 border-teal-600 rounded-md"
          >
            Create Resume
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default Template;
