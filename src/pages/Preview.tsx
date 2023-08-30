import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Template1 from "../components/templates/Template1";

const Preview = () => {
  const personalDetails = JSON.parse(
    localStorage.getItem("personalDetails") || "{}",
  );
  const educationalDetails = JSON.parse(
    localStorage.getItem("educationalDetails") || "{}",
  );
  const projects = JSON.parse(localStorage.getItem("projects") || "{}");
  const certificate = JSON.parse(localStorage.getItem("certificate") || "{}");
  const socialLinks = JSON.parse(localStorage.getItem("socialLinks") || "{}");
  const data = {
    personalDetails,
    educationalDetails,
    projects,
    certificate,
    socialLinks,
  };

  return (
    <div>
      {/* adding the header */}
      <Header />

      {/* for showing the resume preview */}
      {/* <Template1 data={data} /> */}

      {/* adding the footer */}
      <Footer />
    </div>
  );
};

export default Preview;
