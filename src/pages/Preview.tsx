import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Template1 from "../components/templates/Template1";
import { IpreviewData } from "../helper/interface";
import usePdfDownload from "../helper/hooks/usePdfDownload";

const Preview = () => {
  const navigate = useNavigate();
  const { generatePDF, pdfData, resetPdfData, isGenerating } = usePdfDownload();
  const report = useRef<HTMLDivElement>(null);
  const [data, setDate] = useState<IpreviewData>();

  // for getting data from local storage
  useEffect(() => {
    const personalDetails = JSON.parse(
      localStorage.getItem("personalDetails") || "{}",
    );
    const educationalDetails = JSON.parse(
      localStorage.getItem("educationalDetails") || "{}",
    );
    const workExperience = JSON.parse(
      localStorage.getItem("workExperience") || "[]",
    );
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const certificate = JSON.parse(localStorage.getItem("certificate") || "[]");
    const socialLinks = JSON.parse(localStorage.getItem("socialLinks") || "{}");

    const newData: IpreviewData = {
      personalDetails,
      educationalDetails,
      projects: projects?.projects,
      certificate,
      socialLinks,
      workExperience,
    };
    setDate({ ...newData });
  }, []);

  // for checking invalid access
  useEffect(() => {
    if (
      (data?.personalDetails && !Object.keys(data?.personalDetails).length) ||
      (data?.educationalDetails &&
        !Object.keys(data?.educationalDetails).length) ||
      (data?.projects && !Object.keys(data?.projects).length) ||
      (data?.socialLinks && !Object.keys(data?.socialLinks).length)
    ) {
      toast.error("Invalid access");
      navigate("/");
    }
  }, [navigate, data]);

  return (
    <div>
      {/* adding the header */}
      <Header />

      {/* for showing the resume preview */}
      <div ref={report}>
        <Template1 data={data!} />
      </div>

      {/* for download and go back button */}
      <div className="flex items-center justify-center gap-5">
        <button
          type="submit"
          className="px-5 py-2 font-bold transition-all duration-200 ease-in-out border-2 border-black rounded-md hover:bg-gray-100"
        >
          <Link to="/form">Edit data</Link>
        </button>
        <button
          type="submit"
          className="px-5 py-2 font-bold text-white transition-all duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md hover:bg-teal-700 hover:border-teal-700"
        >
          {pdfData ? (
            <a
              rel="noreferrer"
              href={URL.createObjectURL(pdfData)}
              download={`${data?.personalDetails?.fullName} resume.pdf`}
              onClick={resetPdfData}
            >
              Download resume
            </a>
          ) : !isGenerating ? (
            <button
              type="button"
              onClick={() => report.current && generatePDF(report.current)}
            >
              Generate Resume
            </button>
          ) : (
            <p>Generating...</p>
          )}
        </button>
      </div>

      {/* adding the footer */}
      <Footer />
    </div>
  );
};

export default Preview;
