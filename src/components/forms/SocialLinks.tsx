import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

interface IformData {
  github: string;
  linkedin: string;
  email: string;
  portfolio?: string;
}

const SocialLinks: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("socialLinks");
  if (storedData) {
    console.log(JSON.parse(storedData));
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IformData>({
    defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
  });

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
    console.log(data);
    // saving data to the local storage
    localStorage.setItem("socialLinks", JSON.stringify(data));
    setCurrentStep(currentStep + 1);
  };

  // function to handle the previous button
  const handlePreviousBtn = () => {
    if (currentStep === 0) {
      return;
    }
    const data = watch();
    // saving data to the local storage
    localStorage.setItem("socialLinks", JSON.stringify(data));
    setCurrentStep(currentStep - 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col justify-center space-y-3 w-80 m-auto"
    >
      <h1 className="font-bold text-xl">Enter Your Social Media Links</h1>

      {/* for github */}
      <section className="w-full">
        <label htmlFor="github" className="font-semibold">
          Github
          <input
            id="github"
            className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
              errors.github
                ? "focus:outline-red-500"
                : "focus:outline-teal-600 "
            }`}
            type="text"
            placeholder="https://github.com/Vinay-Pratap-Singh"
            {...register("github", {
              required: {
                value: true,
                message: "* Please enter your github account link",
              },
              pattern: {
                value: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
                message: "Please enter a valid github profile link",
              },
            })}
          />
        </label>
        {errors.github && (
          <p className="text-red-500">{errors.github.message}</p>
        )}
      </section>

      {/* for linkedin */}
      <section className="w-full">
        <label htmlFor="github" className="font-semibold">
          Linkedin
          <input
            id="linkedin"
            className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
              errors.linkedin
                ? "focus:outline-red-500"
                : "focus:outline-teal-600 "
            }`}
            type="text"
            placeholder="https://linkedin.com/Vinay-Pratap-Singh"
            {...register("linkedin", {
              required: {
                value: true,
                message: "* Please enter your linkedin profile link",
              },
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
                message: "Please enter a valid linkedin profile link",
              },
            })}
          />
        </label>
        {errors.linkedin && (
          <p className="text-red-500">{errors.linkedin.message}</p>
        )}
      </section>

      {/* for email */}
      <section className="w-full">
        <label htmlFor="github" className="font-semibold">
          Email ID
          <input
            id="email"
            className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
              errors.email ? "focus:outline-red-500" : "focus:outline-teal-600 "
            }`}
            type="text"
            placeholder="test@gmail.com"
            {...register("email", {
              required: {
                value: true,
                message: "* Please enter your email id",
              },
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
        </label>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </section>

      {/* for portfolio */}
      <section className="w-full">
        <label htmlFor="portfolio" className="font-semibold">
          Portfolio (Optional)
          <input
            id="portfolio"
            className="px-2 py-1 mt-1 border-2 w-full font-normal focus:outline-teal-600"
            type="text"
            placeholder="https://harvi.me"
            {...register("portfolio")}
          />
        </label>
      </section>

      {/* button to submit the form */}
      <footer className="w-full flex items-center justify-center gap-2">
        <button
          type="button"
          className="border-2 border-black px-5 py-2 rounded-md font-bold"
          onClick={handlePreviousBtn}
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-teal-600 border-2 border-teal-600 text-white px-5 py-2 rounded-md font-bold"
        >
          Save and Next
        </button>
      </footer>
    </form>
  );
};

export default SocialLinks;
