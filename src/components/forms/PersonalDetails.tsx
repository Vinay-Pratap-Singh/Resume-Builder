import { FC, useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IpersonalDetails } from "../../helper/interface";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

const PersonalDetails: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("personalDetails");

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IpersonalDetails>({
    defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
  });
  const {
    fields: languageField,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languages",
  });
  const {
    fields: hobbyField,
    append: appendHobby,
    remove: removeHobby,
  } = useFieldArray({
    control,
    name: "interests",
  });
  const {
    fields: skillsField,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  // for error message of language, interest and skills
  const [languageError, setLanguageError] = useState<string | null>(null);
  const [interestError, setInterestError] = useState<string | null>(null);
  const [skillsError, setSkillsError] = useState<string | null>(null);

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IpersonalDetails> = (data) => {
    if (
      !data?.languages.length ||
      !data?.interests.length ||
      !data?.skills.length
    ) {
      toast.error("Minimum one language, interest and skill required");
      return;
    }
    // saving data to the local storage
    localStorage.setItem("personalDetails", JSON.stringify(data));
    setCurrentStep(currentStep + 1);
  };

  // function to handle the previous button
  const handlePreviousBtn = () => {
    if (currentStep === 0) {
      return;
    }
    // saving data to the local storage
    const data = watch();
    localStorage.setItem("personalDetails", JSON.stringify(data));
    setCurrentStep(currentStep - 1);
  };

  // for language error
  useEffect(() => {
    if (errors.languages && (errors.languages as unknown[]).length > 0) {
      for (let i = 0; i < (errors.languages as unknown[]).length; i = +1) {
        if (errors.languages[i]?.language?.message) {
          setLanguageError(errors.languages[i]?.language?.message || null);
          break;
        }
      }
    } else {
      setLanguageError(null);
    }
  }, [errors.languages]);

  // for interest error
  useEffect(() => {
    if (errors.interests && (errors.interests as unknown[]).length > 0) {
      for (let i = 0; i < (errors.interests as unknown[]).length; i = +1) {
        if (errors.interests[i]?.hobby?.message) {
          setInterestError(errors.interests[i]?.hobby?.message || null);
          break;
        }
      }
    } else {
      setInterestError(null);
    }
  }, [errors.interests]);

  // for skills error
  useEffect(() => {
    if (errors.skills && (errors.skills as unknown[]).length > 0) {
      for (let i = 0; i < (errors.skills as unknown[]).length; i = +1) {
        if (errors.skills[i]?.name) {
          setSkillsError(errors.skills[i]?.message || null);
          break;
        }
      }
    } else {
      setSkillsError(null);
    }
  }, [errors.skills]);

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col justify-center gap-5 lg:gap-10"
    >
      <div className="flex flex-col flex-wrap justify-center gap-5 px-2 lg:gap-5 lg:flex-row xl:px-24 lg:px-16 md:px-5">
        {/* personal details section */}
        <div className="w-full p-2 space-y-3 rounded-md shadow-md lg:p-4 lg:flex-1">
          <h1 className="text-lg font-bold lg:text-xl">
            Enter Your Basic Details
          </h1>

          {/* for user full name */}
          <section className="w-full">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold lg:text-base"
            >
              Full Name
              <input
                id="fullName"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.fullName
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Vinay Pratap Singh"
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "* Please enter your full name",
                  },
                  minLength: {
                    value: 3,
                    message: "* Name should have atleast 3 characters",
                  },
                })}
              />
            </label>
            {errors.fullName && (
              <p className="text-sm text-red-500 lg:text-base">
                {errors.fullName.message}
              </p>
            )}
          </section>

          {/* for user phone number */}
          <section className="w-full">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-semibold lg:text-base"
            >
              Phone Number
              <input
                id="phoneNumber"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.phoneNumber
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="number"
                placeholder="9874563210"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "* Please enter your phone number",
                  },
                  minLength: {
                    value: 10,
                    message: "* Number should contain 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "* Number should contain 10 digits",
                  },
                  pattern: {
                    value: /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/,
                    message: "* Please enter a valid phone number",
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

          {/* for user state name */}
          <section className="w-full">
            <label
              htmlFor="stateName"
              className="text-sm font-semibold lg:text-base"
            >
              State Name
              <input
                id="stateName"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.state
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="UP"
                {...register("state", {
                  required: {
                    value: true,
                    message: "* Please enter your state name",
                  },
                  minLength: {
                    value: 2,
                    message: "* Please enter a valid state name",
                  },
                })}
              />
            </label>
            {errors.state && (
              <p className="text-sm text-red-500 lg:text-base">
                {errors.state.message}
              </p>
            )}
          </section>

          {/* for user city */}
          <section className="w-full">
            <label
              htmlFor="cityName"
              className="text-sm font-semibold lg:text-base"
            >
              City Name
              <input
                id="cityName"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.city
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Gorakhpur"
                {...register("city", {
                  required: {
                    value: true,
                    message: "* Please enter your city name",
                  },
                  minLength: {
                    value: 3,
                    message: "* Please enter a valid city name",
                  },
                })}
              />
            </label>
            {errors.city && (
              <p className="text-sm text-red-500 lg:text-base">
                {errors.city.message}
              </p>
            )}
          </section>
        </div>

        {/* for user job role details */}
        <div className="flex flex-col w-full p-2 space-y-3 rounded-md shadow-md lg:p-4 lg:flex-1">
          {/* for job role  */}
          <section className="w-full">
            <label
              htmlFor="cityName"
              className="text-sm font-semibold lg:text-base"
            >
              Job Role
              <input
                id="jobRole"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.role
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Frontend developer"
                {...register("role", {
                  required: {
                    value: true,
                    message: "* Please enter your role",
                  },
                  minLength: {
                    value: 3,
                    message: "* Please enter a valid role type",
                  },
                })}
              />
            </label>
            {errors.role && (
              <p className="text-sm text-red-500 lg:text-base">
                {errors.role.message}
              </p>
            )}
          </section>

          {/* for role description  */}
          <section className="self-stretch w-full h-full">
            <label
              htmlFor="cityName"
              className="text-sm font-semibold lg:text-base"
            >
              About yourself
              <textarea
                id="bio"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 h-40 lg:h-[90%] resize-none ${
                  errors.bio
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                placeholder="Use chatGPT to generate a bio of yourself"
                {...register("bio", {
                  required: {
                    value: true,
                    message: "* Please enter about yourself",
                  },
                  minLength: {
                    value: 15,
                    message: "* Please enter a valid bio",
                  },
                })}
              />
            </label>
            {errors.role && (
              <p className="text-sm text-red-500 lg:text-base">
                {errors.role.message}
              </p>
            )}
          </section>
        </div>

        {/* for language, hobbies and skills */}
        <div className="space-y-3 w-full xl:w-[28rem] p-2 lg:p-4 shadow-md rounded-md">
          {/* for language */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              {" "}
              <h1 className="text-lg font-bold lg:text-xl">Languages known</h1>
              {/* for adding new language */}
              <button
                type="button"
                className="font-bold text-white transition-all duration-200 ease-in-out bg-teal-600 rounded-full w-fit hover:bg-teal-700"
                onClick={() =>
                  appendLanguage({
                    language: "",
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 lg:w-7 lg:h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            {/* for displaying all the languages */}
            <div className="flex flex-wrap items-center gap-4">
              {languageField.map((item, index) => {
                return (
                  <section key={item.id} className="relative w-32">
                    <label
                      htmlFor={`languages.${index}.language`}
                      className="text-sm font-semibold lg:text-base"
                    >
                      Language {index + 1}
                      <input
                        id={`languages.${index}.language`}
                        className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                          errors.languages && errors.languages[index]
                            ? "focus:outline-red-500"
                            : "focus:outline-teal-600 "
                        }`}
                        type="text"
                        placeholder="Hindi"
                        {...register(`languages.${index}.language` as const, {
                          required: {
                            value: true,
                            message: "* Please fill the language",
                          },
                          minLength: {
                            value: 3,
                            message: "* Please write a valid language",
                          },
                        })}
                      />
                    </label>
                    <button
                      className="absolute top-0 right-0 font-bold text-white transition-all duration-200 ease-in-out bg-red-500 rounded-full w-fit hover:bg-red-600"
                      type="button"
                      onClick={() => removeLanguage(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 lg:w-6 lg:h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </section>
                );
              })}
            </div>

            {/* for displaying the errors */}
            {languageError && (
              <p className="text-sm text-red-500 lg:text-base">
                {languageError}
              </p>
            )}
          </div>

          {/* for user hobbies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold lg:text-xl">
                Your interest area
              </h1>

              {/* for adding new hobby */}
              <button
                type="button"
                className="font-bold text-white transition-all duration-200 ease-in-out bg-teal-600 rounded-full w-fit hover:bg-teal-700"
                onClick={() =>
                  appendHobby({
                    hobby: "",
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 lg:w-7 lg:h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            {/* for displaying all the hobbies */}
            <div className="flex flex-wrap items-center gap-4">
              {hobbyField.map((item, index) => {
                return (
                  <section key={item.id} className="relative w-32">
                    <label
                      htmlFor={`interests.${index}.hobby`}
                      className="text-sm font-semibold lg:text-base"
                    >
                      Hobby {index + 1}
                      <input
                        id={`interests.${index}.hobby`}
                        className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                          errors.interests && errors.interests[index]
                            ? "focus:outline-red-500"
                            : "focus:outline-teal-600 "
                        }`}
                        type="text"
                        placeholder="Playing cricket"
                        {...register(`interests.${index}.hobby` as const, {
                          required: {
                            value: true,
                            message: "* Please fill the hobbies",
                          },
                          minLength: {
                            value: 3,
                            message: "* Please write a valid hobby",
                          },
                        })}
                      />
                    </label>
                    <button
                      className="absolute top-0 right-0 font-bold text-white transition-all duration-200 ease-in-out bg-red-500 rounded-full w-fit hover:bg-red-600"
                      type="button"
                      onClick={() => removeHobby(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 lg:w-6 lg:h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </section>
                );
              })}
            </div>

            {/* for displaying the errors */}
            {interestError && (
              <p className="text-sm text-red-500 lg:text-base">
                {interestError}
              </p>
            )}
          </div>

          {/* for user skills */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold lg:text-xl">Add your skills</h1>

              {/* for adding new skills */}
              <button
                type="button"
                className="font-bold text-white transition-all duration-200 ease-in-out bg-teal-600 rounded-full w-fit hover:bg-teal-700"
                onClick={() =>
                  appendSkill({
                    name: "",
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 lg:w-7 lg:h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            {/* for displaying all the skills */}
            <div className="flex flex-wrap items-center gap-4">
              {skillsField.map((item, index) => {
                return (
                  <section key={item.id} className="relative w-32">
                    <label
                      htmlFor={`skills.${index}.name`}
                      className="text-sm font-semibold lg:text-base"
                    >
                      Skill {index + 1}
                      <input
                        id={`skills.${index}.name`}
                        className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                          errors.skills && errors.skills[index]
                            ? "focus:outline-red-500"
                            : "focus:outline-teal-600 "
                        }`}
                        type="text"
                        placeholder="HTML"
                        {...register(`skills.${index}.name` as const, {
                          required: {
                            value: true,
                            message: "* Please fill the skill",
                          },
                          minLength: {
                            value: 3,
                            message: "* Please write a valid skill",
                          },
                        })}
                      />
                    </label>
                    <button
                      className="absolute top-0 right-0 font-bold text-white transition-all duration-200 ease-in-out bg-red-500 rounded-full w-fit hover:bg-red-600"
                      type="button"
                      onClick={() => removeSkill(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 lg:w-6 lg:h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </section>
                );
              })}
            </div>

            {/* for displaying the errors */}
            {skillsError && (
              <p className="text-sm text-red-500 lg:text-base">{skillsError}</p>
            )}
          </div>
        </div>
      </div>

      <footer className="m-auto space-x-5 w-fit">
        {/* button to submit the form */}
        <button
          type="button"
          className="px-3 py-1 text-sm font-semibold transition-all duration-200 ease-in-out border-2 border-black rounded-md lg:font-bold lg:text-base lg:px-5 lg:py-2 hover:bg-gray-100"
          onClick={handlePreviousBtn}
        >
          Back
        </button>
        <button
          type="submit"
          className="px-3 py-1 text-sm font-semibold text-white transition-all duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md lg:font-bold lg:text-base lg:px-5 lg:py-2 hover:bg-teal-700 hover:border-teal-700"
        >
          Save and Next
        </button>
      </footer>
    </form>
  );
};

export default PersonalDetails;
