import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="sticky_navbar w-full px-24 h-20 bg-teal-50 flex items-center justify-between">
      {/* creating the logo */}
      <h1 className="text-xl font-semibold">
        Wizard <span className="font-bold text-teal-500">CV</span>
      </h1>

      {/* adding the nav items */}
      <ul className="flex items-center gap-10 font-semibold">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#features" className="active:text-teal-500">
            Features
          </a>
        </li>
        <li>
          <a href="#template" className="active:text-teal-500">
            Template
          </a>
        </li>
        <li>
          <a href="#faq" className="active:text-teal-500">
            FAQ
          </a>
        </li>
        <li>
          <a href="#contact" className="active:text-teal-500">
            Contact Us
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

export default Header;
