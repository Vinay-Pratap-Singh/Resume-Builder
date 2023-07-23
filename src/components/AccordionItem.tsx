import React, { useState } from "react";

interface Iprop {
  title: string;
  content: string;
}

const AccordionItem = ({ title, content }: Iprop) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-4 w-full m-auto">
      <button
        type="button"
        className="w-full px-4 py-2 text-left bg-gray-100 text-gray-800 font-semibold flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="transform rotate-0 transition-transform text-xl">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-max-height ease-in-out duration-300 ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2 bg-white">
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
