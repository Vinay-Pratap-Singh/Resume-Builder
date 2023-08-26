import React, { useState } from "react";
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
  ClipboardDocumentIcon,
  IdentificationIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";
import PersonalDetails from "../components/forms/PersonalDetails";
import EducationalDetails from "../components/forms/EducationalDetails";
import Projects from "../components/forms/Projects";
import Certificates from "../components/forms/Certificates";
import SocialLinks from "../components/forms/SocialLinks";
import Template from "../components/forms/Template";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  let steps = [
    {
      id: "0",
      name: "Personal Details",
      href: "#",
      status: "complete",
      icons: <IdentificationIcon />,
      component: (
        <PersonalDetails
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "1",
      name: "Educational Details",
      href: "#",
      status: "current",
      icons: <AcademicCapIcon />,
      component: (
        <EducationalDetails
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "2",
      name: "Projects",
      href: "#",
      status: "upcoming",
      icons: <BookOpenIcon />,
      component: (
        <Projects currentStep={currentStep} setCurrentStep={setCurrentStep} />
      ),
    },
    {
      id: "3",
      name: "Certificates",
      href: "#",
      status: "upcoming",
      icons: <ClipboardDocumentIcon />,
      component: (
        <Certificates
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "4",
      name: "Social Links",
      href: "#",
      status: "upcoming",
      icons: <ChatBubbleLeftIcon />,
      component: (
        <SocialLinks
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "5",
      name: "Template",
      href: "#",
      status: "upcoming",
      icons: <PrinterIcon />,
      component: (
        <Template currentStep={currentStep} setCurrentStep={setCurrentStep} />
      ),
    },
  ];
  const newSteps = [...steps];
  for (let i = 0; i < newSteps.length; i += 1) {
    if (Number(newSteps[i].id) === currentStep) {
      newSteps[i].status = "current";
    } else if (Number(newSteps[i].id) > currentStep) {
      newSteps[i].status = "upcoming";
    } else {
      newSteps[i].status = "complete";
    }
  }
  // updating the steps data with new one
  steps = [...newSteps];

  return (
    <div className="">
      <Header />
      {/* creating the stepper */}
      <div className="flex items-center mx-24 mt-10">
        {steps.map((step, stepIndex) => {
          return step.status === "complete" ? (
            <>
              <div className="flex items-center text-teal-600 relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center border-2 border-teal-600">
                  <div className="h-6 w-6">{step?.icons}</div>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                  {step?.name}
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
            </>
          ) : step.status === "current" ? (
            <>
              <div className="flex items-center text-white relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center border-2 bg-teal-600 border-teal-600">
                  <div className="h-6 w-6">{step?.icons}</div>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                  {step?.name}
                </div>
              </div>
              {stepIndex !== steps.length - 1 && (
                <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />
              )}
            </>
          ) : (
            <>
              <div className="flex items-center text-gray-500 relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center border-2 border-gray-300">
                  <div className="h-6 w-6">{step?.icons}</div>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
                  {step.name}
                </div>
              </div>
              {stepIndex !== steps.length - 1 && (
                <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />
              )}
            </>
          );
        })}
      </div>

      {/* adding the form section */}
      <section className="mt-20 ">{steps[currentStep]?.component}</section>

      {/* adding the footer */}
      <Footer />
    </div>
  );
};

export default Stepper;
