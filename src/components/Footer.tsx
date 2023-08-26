import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-10 h-20 flex items-center justify-between px-24 bg-[#385A64] font-medium text-white">
      <p>
        © {currentYear}{" "}
        <a
          href="https://www.linkedin.com/in/vinay-pratap-singh-harvi-4b265a212/"
          className="text-teal-500 underline"
        >
          Vinay Pratap Singh
        </a>
        . All rights reserved.
      </p>

      <p>
        Made with ❤️ by{" "}
        <a href="https://harvi.me/" className="text-teal-500 underline">
          Harvi
        </a>
      </p>

      {/* adding social media links */}
      <div className="space-x-5 text-xl">
        <a href="https://github.com/Vinay-Pratap-Singh">
          <i className="fa-brands fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/vinay-pratap-singh-harvi-4b265a212/">
          <i className="fa-brands fa-linkedin" />
        </a>
        <a href="https://www.instagram.com/itsmevinayhere/">
          <i className="fa-brands fa-instagram" />
        </a>
        <a href="https://twitter.com/harvi2001">
          <i className="fa-brands fa-twitter" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
