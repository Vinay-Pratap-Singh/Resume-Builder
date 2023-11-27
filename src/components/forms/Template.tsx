import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import template1 from "../../assets/templates/template1.png";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

const Template: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  // function to handle the previous button
  const handlePreviousBtn = () => {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  // function to set template color
  const handleTemplateColor = (index: number) => {
    setSelectedTemplate(index);
    if (index === 0) {
      localStorage.setItem("templateColor", "gray");
    } else if (index === 1) {
      localStorage.setItem("templateColor", "teal");
    } else if (index === 2) {
      localStorage.setItem("templateColor", "cyan");
    }
  };

  // for setting the default template color
  useEffect(() => {
    localStorage.setItem("templateColor", "gray");
  }, []);

  return (
    <div className="m-auto space-y-10 text-center">
      <h1 className="text-2xl font-bold">Choose any template</h1>
      <header className="flex flex-wrap items-center justify-center gap-10">
        {/* for template 1 */}
        <div
          onClick={() => handleTemplateColor(0)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTemplateColor(0);
            }
          }}
          role="button"
          tabIndex={0}
          className={`flex flex-col items-center justify-center p-2 font-semibold cursor-pointer border-[1px] border-gray-300 ${
            selectedTemplate === 0 ? "shadow-md border-none" : "shadow-none"
          }`}
        >
          <img className="w-72 h-90" src={template1} alt="template1" />
          <h2 className="w-full py-2 text-white bg-gray-500">
            Template Color: Gray
          </h2>
        </div>

        {/* for template 2 */}
        <div
          onClick={() => handleTemplateColor(1)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTemplateColor(1);
            }
          }}
          role="button"
          tabIndex={0}
          className={`flex flex-col items-center justify-center p-2 font-semibold cursor-pointer border-[1px] border-gray-300 ${
            selectedTemplate === 1
              ? "shadow-md border-none scale-[1.02]"
              : "shadow-none"
          }`}
        >
          <img className="w-72 h-90" src={template1} alt="template1" />
          <h2 className="w-full py-2 text-white bg-teal-500">
            Template Color: Teal
          </h2>
        </div>

        {/* for template 3 */}
        <div
          onClick={() => handleTemplateColor(2)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTemplateColor(2);
            }
          }}
          role="button"
          tabIndex={0}
          className={`flex flex-col items-center justify-center p-2 font-semibold cursor-pointer border-[1px] border-gray-300 ${
            selectedTemplate === 2
              ? "shadow-md border-none scale-[1.02]"
              : "shadow-none"
          }`}
        >
          <img className="w-72 h-90" src={template1} alt="template1" />
          <h2 className="w-full py-2 text-white bg-cyan-500">
            Template Color: Cyan
          </h2>
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
