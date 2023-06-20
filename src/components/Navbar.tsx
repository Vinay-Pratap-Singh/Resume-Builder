import React from "react";

const Navbar = () => {
  return (
    <nav className="mx-24 my-5 flex items-center justify-between">
      {/* creating the logo */}
      <h1 className="text-xl font-semibold">
        Wizard <span className="font-bold text-teal-500">CV</span>
      </h1>

      {/* adding the nav items */}
      <ul className="flex items-center gap-5 font-semibold">
        <li>
          <a href="#home" className="active:text-teal-500">
            Home
          </a>
        </li>
        <li>
          <a href="#template" className="active:text-teal-500">
            Template
          </a>
        </li>
        <li>
          <a href="#about" className="active:text-teal-500">
            About
          </a>
        </li>
      </ul>

      {/* adding the button */}
      <button
        type="button"
        className=" bg-teal-500 rounded-full px-5 py-2 text-white font-bold hover:bg-teal-600 transition-all duration-200 ease-in-out"
      >
        Get Started <span className="text-xl">&#8250;</span>
      </button>
    </nav>
  );
};

export default Navbar;
