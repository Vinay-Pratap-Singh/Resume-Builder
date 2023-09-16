import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IsocialLinks } from "../../helper/interface";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

const SocialLinks: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("socialLinks");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IsocialLinks>({
    defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
  });

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IsocialLinks> = (data) => {
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
      className="px-2 space-y-5 md:space-y-10 md:px-0"
    >
      <div className="flex flex-col justify-center w-full p-2 m-auto space-y-3 rounded-md shadow-md md:p-4 md:w-96">
        <h1 className="text-lg font-bold lg:text-xl">
          Enter Your Social Media Links
        </h1>

        {/* for github */}
        <section className="w-full">
          <label
            htmlFor="github"
            className="text-sm font-semibold lg:text-base"
          >
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
                  value:
                    /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
                  message: "Please enter a valid github profile link",
                },
              })}
            />
          </label>
          {errors.github && (
            <p className="text-sm text-red-500 lg:text-base">
              {errors.github.message}
            </p>
          )}
        </section>

        {/* for linkedin */}
        <section className="w-full">
          <label
            htmlFor="github"
            className="text-sm font-semibold lg:text-base"
          >
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
            <p className="text-sm text-red-500 lg:text-base">
              {errors.linkedin.message}
            </p>
          )}
        </section>

        {/* for email */}
        <section className="w-full">
          <label
            htmlFor="github"
            className="text-sm font-semibold lg:text-base"
          >
            Email ID
            <input
              id="email"
              className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                errors.email
                  ? "focus:outline-red-500"
                  : "focus:outline-teal-600 "
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
          {errors.email && (
            <p className="text-sm text-red-500 lg:text-base">
              {errors.email.message}
            </p>
          )}
        </section>

        {/* for phone number */}
        <section className="w-full">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-semibold lg:text-base"
          >
            Phone number
            <input
              id="phoneNumber"
              className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                errors.phoneNumber
                  ? "focus:outline-red-500"
                  : "focus:outline-teal-600 "
              }`}
              type="number"
              placeholder="9807654321"
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "* Please enter your phone number",
                },
                pattern: {
                  value: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
          </label>
          {errors.phoneNumber && (
            <p className="text-sm text-red-500 lg:text-base">
              {errors.phoneNumber.message}
            </p>
          )}
        </section>

        {/* for portfolio */}
        <section className="w-full">
          <label
            htmlFor="portfolio"
            className="text-sm font-semibold lg:text-base"
          >
            Portfolio (Optional)
            <input
              id="portfolio"
              className="w-full px-2 py-1 mt-1 font-normal border-2 focus:outline-teal-600"
              type="text"
              placeholder="https://harvi.me"
              {...register("portfolio")}
            />
          </label>
        </section>
      </div>

      {/* button to submit the form */}
      <footer className="flex items-center justify-center w-full gap-2">
        <button
          type="button"
          className="px-3 py-1 text-sm font-semibold transition-all duration-200 ease-in-out border-2 border-black rounded-md lg:px-5 lg:py-2 lg:font-bold lg:text-base hover:bg-gray-100"
          onClick={handlePreviousBtn}
        >
          Back
        </button>
        <button
          type="submit"
          className="px-3 py-1 text-sm font-semibold text-white transition-all duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md lg:px-5 lg:py-2 lg:font-bold lg:text-base hover:bg-teal-700 hover:border-teal-700"
        >
          Save and Next
        </button>
      </footer>
    </form>
  );
};

export default SocialLinks;
