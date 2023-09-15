import { useState } from "react";

interface Iprop {
  title: string;
  content: string;
}

const AccordionItem = ({ title, content }: Iprop) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full m-auto mb-4 border rounded-lg">
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 font-semibold text-left text-gray-800 bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="text-xl transition-transform transform rotate-0">
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
