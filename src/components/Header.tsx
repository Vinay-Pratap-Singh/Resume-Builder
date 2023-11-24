import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isData, setIsData] = useState(false);

  // for checking data exist or not
  useEffect(() => {
    const personalDetails = JSON.parse(
      localStorage.getItem("personalDetails") || "{}",
    );
    const educationalDetails = JSON.parse(
      localStorage.getItem("educationalDetails") || "{}",
    );
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const socialLinks = JSON.parse(localStorage.getItem("socialLinks") || "{}");

    if (
      Object.keys(personalDetails).length &&
      Object.keys(educationalDetails).length &&
      Object.keys(projects).length &&
      Object.keys(socialLinks).length
    ) {
      setIsData(true);
    }
  }, []);

  return (
    <nav className="sticky_navbar w-full px-2 lg:px-16 md:px-5 xl:px-24 py-2 lg:py-0 lg:h-20 bg-[#385A64] flex items-center justify-between text-white">
      {/* creating the logo */}
      <Link to="/">
        <h1 className="text-lg font-semibold lg:text-xl">
          Wizard <span className="font-bold text-teal-500">CV</span>
        </h1>
      </Link>

      {/* adding the nav items */}
      {location.pathname === "/" && (
        <ul className="items-center hidden gap-10 font-semibold lg:flex">
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
      )}

      {/* adding the buttons */}
      <div className="flex items-center gap-5">
        {/* get started button */}
        <Link
          to="/form"
          className={`${
            location.pathname === "/form" || location.pathname === "/preview"
              ? "hidden"
              : "block"
          } hidden lg:block`}
        >
          <button
            type="button"
            className="px-5 py-2 font-bold text-white transition-all duration-200 ease-in-out bg-teal-500 rounded-full hover:bg-teal-600"
          >
            Get Started <span className="text-xl">&#8250;</span>
          </button>
        </Link>

        {/* preview button */}
        {isData && (
          <Link
            to="/preview"
            className={`${
              location.pathname === "/preview" ? "hidden" : "block"
            }`}
          >
            <button
              type="button"
              className="px-5 py-1 font-bold text-teal-500 transition-all duration-200 ease-in-out bg-white border border-teal-500 rounded-full lg:py-2 hover:text-teal-600"
            >
              Preview <span className="text-xl">&#8250;</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
