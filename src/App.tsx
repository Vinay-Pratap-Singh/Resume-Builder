import { useEffect, useId } from "react";
import { Link } from "react-router-dom";
import mainImage from "./assets/mainImage.jpg";
import featuresImage from "./assets/features.jpg";
import AccordionItem from "./components/AccordionItem";
import contact from "./assets/contact.jpg";
import template1 from "./assets/templates/template1.png";
import Header from "./components/Header";
import MoveToTop from "./components/MoveToTop";
import Footer from "./components/Footer";

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

  // for handling the scroll animation behaviour
  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll_animation");

    const revealHandler = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;

      revealElements.forEach((element) => {
        const revealTop = element.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
          element.classList.add("active_animation");
        } else {
          element.classList.remove("active_animation");
        }
      });
    };

    // adding the event listener
    window.addEventListener("scroll", revealHandler);

    // removing the event listener
    return () => {
      window.removeEventListener("scroll", revealHandler);
    };
  }, []);

  return (
    <>
      {/* adding the move to top button */}
      <MoveToTop />

      <header>
        {/* adding the navigation menu */}
        <Header />

        {/* creating the main section */}
        <main
          id="home"
          className="flex flex-col-reverse items-center justify-between gap-5 mx-5 mt-5 mb-10 lg:gap-10 lg:mx-24 lg:flex-row"
        >
          {/* section for the platform details */}
          <div className="lg:w-26rem">
            <p className="font-medium text-gray-600 ">Elevate your potential</p>
            <h1 className="my-2 text-3xl font-bold leading-snug lg:my-5 lg:text-5xl">
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
              className="px-5 py-2 mt-5 font-bold text-white transition-all duration-200 ease-in-out bg-teal-500 rounded-full lg:mt-10 hover:bg-teal-600"
            >
              <Link to="/form">
                Get Started <span className="text-xl">&#8250;</span>
              </Link>
            </button>
          </div>

          {/* adding the main image */}
          <img
            src={mainImage}
            alt="home page"
            className="lg:w-[30rem] w-full"
          />
        </main>
      </header>

      {/* features section */}
      <section
        id="features"
        className="flex flex-col items-center justify-between mx-5 lg:mx-24 lg:flex-row scroll_animation"
      >
        {/* adding the features image */}
        <img
          src={featuresImage}
          alt="feature section"
          className="w-full lg:w-[30rem]"
        />

        {/* creating the features */}
        <div className="lg:w-[26rem] space-y-2 lg:space-y-5">
          <p className="font-medium text-gray-600 ">
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
          <ul className="pl-4 font-medium text-gray-600 list-disc">
            <li>Customizable Templates</li>
            <li>Easy Editing and Formatting</li>
            <li>One-Click Download</li>
            <li>Privacy and Security</li>
          </ul>

          <button
            type="button"
            className="px-5 py-2 font-bold text-white transition-all duration-200 ease-in-out bg-teal-500 rounded-full hover:bg-teal-600"
          >
            <Link to="/form">
              Build a resume <span className="text-xl">&#8250;</span>{" "}
            </Link>
          </button>
        </div>
      </section>

      {/* template section */}
      <section
        id="template"
        className="mx-5 my-5 space-y-5 lg:space-y-10 lg:my-10 lg:mx-24 scroll_animation"
      >
        <h1 className="text-2xl font-bold text-center">Sample Templates</h1>
        <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-10">
          <img
            className="h-80 w-64 border-[1px] border-gray-300 rounded-md hover:border-none hover:shadow-md hover:-translate-y-2 transition-all ease-in-out duration-300"
            src={template1}
            alt="template"
          />
          <img
            className="h-80 w-64 border-[1px] border-gray-300 rounded-md hover:border-none hover:shadow-md hover:-translate-y-2 transition-all ease-in-out duration-300"
            src={template1}
            alt="template"
          />
          <img
            className="h-80 w-64 border-[1px] border-gray-300 rounded-md hover:border-none hover:shadow-md hover:-translate-y-2 transition-all ease-in-out duration-300"
            src={template1}
            alt="template"
          />
        </div>
      </section>

      {/* FAQ section */}
      <section
        id="faq"
        className="flex flex-col items-center justify-center gap-5 mx-5 my-5 lg:gap-10 lg:my-10 lg:mx-24 scroll_animation"
      >
        <h1 className="text-xl font-bold text-center lg:text-2xl">
          FAQ (Frequently Asked Questions)
        </h1>
        <div className="w-full lg:w-[500px] space-y-2">
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
      <section
        id="contact"
        className="mx-5 space-y-5 lg:space-y-10 lg:mx-24 scroll_animation"
      >
        <h1 className="text-2xl font-bold text-center">Contact Us</h1>
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <img src={contact} alt="contact us" className="lg:w-[30rem]" />
          <form className="w-full p-5 space-y-3 rounded-md shadow-lg md:w-96">
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
                className="py-1 border-b-[1px] border-b-black  focus:outline-teal-500 focus:border-none focus:px-3 font-normal transition-all duration-200 ease-in-out"
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
                className="py-1 border-b-[1px] border-b-black  focus:outline-teal-500 focus:border-none focus:px-3 font-normal transition-all duration-200 ease-in-out"
              />
            </label>

            <label
              htmlFor="usermessage"
              className="flex flex-col gap-1 font-medium"
            >
              Message *
              <textarea
                id="usermessage"
                className="h-32 resize-none py-1 border-b-[1px] border-b-black  focus:outline-teal-500 focus:border-none focus:px-3 font-normal transition-all duration-200 ease-in-out"
                placeholder="Thanks for this platform. Loved it."
              />
            </label>

            <button
              type="submit"
              className="w-full py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out bg-teal-500 hover:bg-teal-600"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* adding the footer section */}
      <Footer />
    </>
  );
};

export default App;
