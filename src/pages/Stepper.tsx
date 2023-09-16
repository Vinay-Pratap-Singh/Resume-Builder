import { useState } from "react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  ClipboardDocumentIcon,
  IdentificationIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";
import { nanoid } from "nanoid";
import PersonalDetails from "../components/forms/PersonalDetails";
import EducationalDetails from "../components/forms/EducationalDetails";
import Projects from "../components/forms/Projects";
import Certificates from "../components/forms/Certificates";
import SocialLinks from "../components/forms/SocialLinks";
import Template from "../components/forms/Template";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WorkExperience from "../components/forms/WorkExperience";

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
          key={nanoid()}
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
          key={nanoid()}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "2",
      name: "Work Experience",
      href: "#",
      status: "upcoming",
      icons: <BriefcaseIcon />,
      component: (
        <WorkExperience
          key={nanoid()}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "3",
      name: "Projects",
      href: "#",
      status: "upcoming",
      icons: <BookOpenIcon />,
      component: (
        <Projects
          key={nanoid()}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "4",
      name: "Certificates",
      href: "#",
      status: "upcoming",
      icons: <ClipboardDocumentIcon />,
      component: (
        <Certificates
          key={nanoid()}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "5",
      name: "Social Links",
      href: "#",
      status: "upcoming",
      icons: <ChatBubbleLeftIcon />,
      component: (
        <SocialLinks
          key={nanoid()}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      id: "6",
      name: "Template",
      href: "#",
      status: "upcoming",
      icons: <PrinterIcon />,
      component: (
        <Template
          key={nanoid()}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
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
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      {/* creating the stepper */}
      <div className="flex items-center mx-2 mt-5 lg:mt-10 md:mx-5 lg:mx-24">
        {steps.map((step, stepIndex) => {
          return step.status === "complete" ? (
            <>
              <div
                key={nanoid()}
                className="relative flex items-center text-teal-600"
              >
                <div className="flex items-center justify-center w-8 h-8 transition duration-500 ease-in-out border-2 border-teal-600 rounded-full lg:w-12 lg:h-12">
                  <div className="w-4 h-4 lg:w-6 lg:h-6">{step?.icons}</div>
                </div>
                <div className="absolute top-0 hidden w-32 mt-16 -ml-10 text-xs font-medium text-center text-teal-600 uppercase lg:block">
                  {step?.name}
                </div>
              </div>
              <div className="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600" />
            </>
          ) : step.status === "current" ? (
            <>
              <div
                key={nanoid()}
                className="relative flex items-center text-white"
              >
                <div className="flex items-center justify-center w-8 h-8 transition duration-500 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-full lg:w-12 lg:h-12">
                  <div className="w-4 h-4 lg:w-6 lg:h-6">{step?.icons}</div>
                </div>
                <div className="absolute top-0 hidden w-32 mt-16 -ml-10 text-xs font-medium text-center text-teal-600 uppercase lg:block">
                  {step?.name}
                </div>
              </div>
              {stepIndex !== steps.length - 1 && (
                <div className="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300" />
              )}
            </>
          ) : (
            <>
              <div
                key={nanoid()}
                className="relative flex items-center text-gray-500"
              >
                <div className="flex items-center justify-center w-8 h-8 transition duration-500 ease-in-out border-2 border-gray-300 rounded-full lg:w-12 lg:h-12">
                  <div className="w-4 h-4 lg:w-6 lg:h-6">{step?.icons}</div>
                </div>
                <div className="absolute top-0 hidden w-32 mt-16 -ml-10 text-xs font-medium text-center text-gray-500 uppercase lg:block">
                  {step.name}
                </div>
              </div>
              {stepIndex !== steps.length - 1 && (
                <div className="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300" />
              )}
            </>
          );
        })}
      </div>

      {/* adding the form section */}
      <section className="self-stretch mt-6 lg:mt-20">
        {steps[currentStep]?.component}
      </section>

      {/* adding the footer */}
      <Footer />
    </div>
  );
};

export default Stepper;
