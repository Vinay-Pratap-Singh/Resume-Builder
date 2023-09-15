const MoveToTop = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      type="button"
      className="fixed z-50 p-1 text-white bg-teal-500 rounded-full shadow-md lg:p-2 bottom-5 lg:bottom-20 right-5 lg:right-10 xl:bottom-24 xl:right-[calc(50%-700px)] hover:bg-teal-600 "
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
