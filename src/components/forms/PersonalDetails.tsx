import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface IformData {
  fullName: string;
  phoneNumber: string;
  city: string;
  state: string;
  languages: {
    language: string;
  }[];
  interests: {
    hobby: string;
  }[];
}

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
  } = useForm<IformData>({
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

  // for error message of language and interest
  const [languageError, setLanguageError] = useState<string | null>(null);
  const [interestError, setInterestError] = useState<string | null>(null);

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
    if (!data?.languages.length || !data?.interests.length) {
      toast.error("Minimum one language and interest required");
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

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col justify-center gap-10"
    >
      <div className="flex justify-center gap-10">
        {/* personal details section */}
        <div className="space-y-3 w-80">
          <h1 className="font-bold text-xl">Enter Your Basic Details</h1>

          {/* for user full name */}
          <section className="w-full">
            <label htmlFor="fullName" className="font-semibold">
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
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </section>

          {/* for user phone number */}
          <section className="w-full">
            <label htmlFor="phoneNumber" className="font-semibold">
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
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </section>

          {/* for user state name */}
          <section className="w-full">
            <label htmlFor="stateName" className="font-semibold">
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
              <p className="text-red-500">{errors.state.message}</p>
            )}
          </section>

          {/* for user city */}
          <section className="w-full">
            <label htmlFor="cityName" className="font-semibold">
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
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </section>
        </div>

        {/* for language and hobbies */}
        <div className="space-y-3 w-[26rem]">
          {/* for language */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              {" "}
              <h1 className="text-xl font-bold">
                Add your language preferences
              </h1>
              {/* for adding new language */}
              <button
                type="button"
                className="w-fit p-1 rounded-full font-bold bg-teal-600 text-white"
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
                  className="w-6 h-6"
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
            <div className="flex items-center flex-wrap gap-4">
              {languageField.map((item, index) => {
                return (
                  <section key={item.id} className="relative w-32">
                    <label
                      htmlFor={`languages.${index}.language`}
                      className="font-semibold"
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
                      className="w-fit font-bold absolute top-0 right-0"
                      type="button"
                      onClick={() => removeLanguage(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
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
            {languageError && <p className="text-red-500">{languageError}</p>}
          </div>

          {/* for user hobbies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Add your interest areas</h1>

              {/* for adding new hobby */}
              <button
                type="button"
                className="w-fit p-1 rounded-full font-bold bg-teal-600 text-white"
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
                  className="w-6 h-6"
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
            <div className="flex items-center flex-wrap gap-4">
              {hobbyField.map((item, index) => {
                return (
                  <section key={item.id} className="relative w-32">
                    <label
                      htmlFor={`interests.${index}.hobby`}
                      className="font-semibold"
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
                      className="w-fit font-bold absolute top-0 right-0"
                      type="button"
                      onClick={() => removeHobby(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
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
            {interestError && <p className="text-red-500">{interestError}</p>}
          </div>
        </div>
      </div>

      <div className="w-fit m-auto space-x-5">
        {/* button to submit the form */}
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
      </div>
    </form>
  );
};

export default PersonalDetails;
