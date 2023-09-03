import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Template1 from "../components/templates/Template1";
import { IpreviewData } from "../helper/interface";

const Preview = () => {
  const navigate = useNavigate();

  const personalDetails = JSON.parse(
    localStorage.getItem("personalDetails") || "{}",
  );
  const educationalDetails = JSON.parse(
    localStorage.getItem("educationalDetails") || "{}",
  );
  const projects = JSON.parse(localStorage.getItem("projects") || "{}");
  const certificate = JSON.parse(localStorage.getItem("certificate") || "{}");
  const socialLinks = JSON.parse(localStorage.getItem("socialLinks") || "{}");

  const data: IpreviewData = {
    personalDetails,
    educationalDetails,
    projects,
    certificate,
    socialLinks,
  };

  // for checking data
  useEffect(() => {
    if (
      !Object.keys(personalDetails).length ||
      !Object.keys(educationalDetails).length ||
      !Object.keys(projects).length ||
      !Object.keys(socialLinks).length
    ) {
      toast.error("Invalid access");
      navigate("/");
    }
  }, [personalDetails, educationalDetails, projects, socialLinks, navigate]);

  return (
    <div>
      {/* adding the header */}
      <Header />

      {/* for showing the resume preview */}
      <Template1 data={data} />

      {/* adding the footer */}
      <Footer />
    </div>
  );
};

export default Preview;
