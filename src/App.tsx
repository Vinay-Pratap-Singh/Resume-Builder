import React, { useId, useState } from "react";
import mainImage from "./assets/mainImage.jpg";
import featuresImage from "./assets/features.jpg";
import Navbar from "./components/Navbar";
import AccordionItem from "./components/AccordionItem";
import contact from "./assets/contact.jpg";

const App = () => {
  const faqData = [
    {
      id: useId(),
      title: "Is the resume builder free to use?",
      content:
        "Yes, our resume builder is completely free to use. You can create and download as many resumes as you need without any charges or limitations.",
    },
    {
      id: useId(),
      title: "Do I need to create an account to use the resume builder?",
      content:
        "No, you do not need to create an account or provide any personal information to use our resume builder. It is a hassle-free process, and we do not save any user data on our side.",
    },
    {
      id: useId(),
      title: "How does the resume builder work?",
      content:
        "Our resume builder offers a simple and user-friendly form where you can fill in your personal details, work experience, education, and other relevant information. You can choose from a variety of professionally designed templates to customize your resume's appearance. Once you're satisfied with your resume, you can download it in PDF format.",
    },
    {
      id: useId(),
      title: "Can I create multiple resumes?",
      content:
        "Absolutely! You can create as many resumes as you need for different job applications or industries. There are no restrictions on the number of resumes you can create using our platform.",
    },
    {
      id: useId(),
      title: "Is my data secure?",
      content:
        "Yes, your data is safe and secure. We do not store any user data on our servers. All the data you enter in the resume builder is stored locally in your browser's localStorage. It means only you have access to your resume data, and it is not shared or saved on our side.",
    },
    {
      id: useId(),
      title: "Can I edit my resume later?",
      content:
        "Absolutely! You can come back to the resume builder at any time and edit your resume. Simply load your existing resume from the localStorage, make the necessary changes, and download the updated version.",
    },
    {
      id: useId(),
      title: "Is the resume builder optimized for ATS?",
      content:
        "Our resume builder is designed for simplicity and ease of use. It generates standard PDF resumes that are suitable for manual submission and sharing. However, it is not specifically optimized for ATS (Applicant Tracking Systems) used by some companies.",
    },
    {
      id: useId(),
      title: "What file format can I download my resume in?",
      content:
        "You can download your resume in PDF format, which is widely accepted and maintains the original formatting and layout across devices.",
    },
    {
      id: useId(),
      title: "Can I use the resume builder on mobile devices?",
      content:
        "Yes, our resume builder is mobile-friendly and can be accessed and used on various devices, including smartphones and tablets.",
    },
  ];

  return (
    <>
      <header id="home">
        {/* adding the navigation menu */}
        <Navbar />

        {/* creating the main section */}
        <main className="flex items-center justify-between gap-10 my-10 mx-24">
          {/* section for the platform details */}
          <div className="w-26rem">
            <p className="text-gray-600 font-medium ">Elevate your potential</p>
            <h1 className="text-5xl font-bold my-5 leading-snug">
              Put your <span className="text-teal-500">dream career</span>{" "}
              within reach.
            </h1>
            <p className="font-medium text-gray-600">
              Elevate your job application with our cutting-edge online resume
              builder. Craft a polished and professional resume that captures
              attention. Start building your impressive resume today!
            </p>
            <button
              type="button"
              className="mt-10 bg-teal-500 rounded-full px-5 py-2 text-white font-bold hover:bg-teal-600 transition-all duration-200 ease-in-out"
            >
              Get Started <span className="text-xl">&#8250;</span>
            </button>
          </div>

          {/* adding the main image */}
          <img src={mainImage} alt="home page" className="w-[30rem]" />
        </main>
      </header>

      {/* features section */}
      <section className="flex items-center justify-between mx-24">
        {/* adding the features image */}
        <img src={featuresImage} alt="feature section" className="w-[30rem]" />

        {/* creating the features */}
        <div className="w-[26rem] space-y-5">
          <p className="text-gray-600 font-medium ">
            Free online resume builder
          </p>
          <h1 className="text-2xl font-bold">
            Powerful Features to Boost Your Resume
          </h1>
          <p className="font-semibold text-gray-600">
            Elevate your job application with our cutting-edge online resume
            builder. Craft a polished and professional resume that captures
            attention. Start building your impressive resume today!
          </p>
          <ul className="font-medium text-gray-600 list-disc pl-4">
            <li>Customizable Templates</li>
            <li>Easy Editing and Formatting</li>
            <li>One-Click Download</li>
            <li>Privacy and Security</li>
          </ul>
          <button
            type="button"
            className="bg-teal-500 rounded-full px-5 py-2 text-white font-bold hover:bg-teal-600 transition-all duration-200 ease-in-out"
          >
            Build a resume <span className="text-xl">&#8250;</span>
          </button>
        </div>
      </section>

      {/* FAQ section */}
      <section className="mx-24 my-10 flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold text-center">
          FAQ (Frequently Asked Questions)
        </h1>
        <div className="w-[500px] space-y-2">
          {faqData.length === 0 ? (
            <h1 className="text-xl font-bold">No FAQ available</h1>
          ) : (
            faqData.map((faq) => {
              return (
                <AccordionItem
                  key={faq?.id}
                  title={faq?.title}
                  content={faq?.content}
                />
              );
            })
          )}
        </div>
      </section>

      {/* contact section */}
      <section className="mx-24 space-y-10">
        <h1 className="text-2xl font-bold text-center">Contact Us</h1>
        <div className="flex items-center justify-between">
          <img src={contact} alt="contact us" className="w-[30rem]" />
          <form className="shadow-lg p-5 rounded-md w-96 space-y-3">
            <label
              htmlFor="username"
              className="flex flex-col gap-1 font-medium"
            >
              Name *
              <input
                type="text"
                id="username"
                placeholder="Vinay Pratap Singh"
                required
                className="px-3 py-1 focus:outline-teal-500 font-normal"
              />
            </label>

            <label
              htmlFor="useremail"
              className="flex flex-col gap-1 font-medium"
            >
              Email *
              <input
                type="email"
                id="useremail"
                placeholder="test@gmail.com"
                required
                className="px-3 py-1 focus:outline-teal-500 font-normal"
              />
            </label>

            <label
              htmlFor="usermessage"
              className="flex flex-col gap-1 font-medium"
            >
              Message *
              <textarea
                id="usermessage"
                className="h-32 resize-none px-3 py-1 focus:outline-teal-500 font-normal"
                placeholder="Thanks for this platform. Loved it."
              />
            </label>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 font-semibold text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default App;
