import React from "react";

const MoveToTop = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      type="button"
      className="fixed bottom-20 right-10 rounded-full bg-teal-500 hover:bg-teal-600 p-2 text-white shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
        />
      </svg>
    </button>
  );
};

export default MoveToTop;
