import React, { FC, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IworkExperience } from "../../helper/interface";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

interface IformData {
  hasExperience: boolean;
  workExperience: IworkExperience[];
}

const WorkExperience: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("workExperience");
  if (storedData) {
    console.log(JSON.parse(storedData));
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IformData>({
    defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  const [hasExperience, setHasExperience] = useState(
    storedData ? JSON.parse(storedData).hasExperience : false,
  );

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
    console.log(data);
    // saving data to the local storage
    localStorage.setItem("workExperience", JSON.stringify(data));
    setCurrentStep(currentStep + 1);
  };

  // function to handle the previous button
  const handlePreviousBtn = () => {
    if (currentStep === 0) {
      return;
    }
    const data = watch();
    // saving data to the local storage
    localStorage.setItem("workExperience", JSON.stringify(data));
    setCurrentStep(currentStep - 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col justify-center w-full gap-10 m-auto"
    >
      <div className="flex flex-col space-y-3">
        {/* for checking user has certificate or not */}
        <section className="flex items-center justify-center w-full gap-2 text-lg font-semibold">
          <label htmlFor="hasExperience" className="font-bold">
            <input
              id="hasExperience"
              className="w-full px-2 py-1 font-normal border-2 cursor-pointer focus:outline-teal-600"
              type="checkbox"
              {...register("hasExperience")}
              onChange={(event) => setHasExperience(event.target.checked)}
            />
          </label>
          Do you have any work experience?
        </section>

        {hasExperience ? (
          <div className="flex flex-col items-center gap-5">
            <div>
              <button
                type="button"
                className="px-5 py-2 font-bold text-white bg-teal-600 border-2 border-teal-600 rounded-md"
                onClick={() =>
                  append({
                    companyName: "",
                    designation: "",
                    startDuration: null,
                    endDuration: null,
                    workDone: [],
                  })
                }
              >
                Add Experience
              </button>
            </div>

            {/* if user has experience */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              {fields.map((item, index) => {
                return (
                  <div key={item.id} className="flex flex-col space-y-3 w-80">
                    <h1 className="text-xl font-bold">Company {index + 1}</h1>
                    {/* for company name */}
                    <section className="w-full">
                      <label
                        htmlFor={`workExperience.${index}.companyName`}
                        className="font-semibold"
                      >
                        Company Name
                        <input
                          id={`workExperience.${index}.companyName`}
                          className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                            errors.workExperience &&
                            errors.workExperience[index]?.companyName
                              ? "focus:outline-red-500"
                              : "focus:outline-teal-600 "
                          }`}
                          type="text"
                          placeholder="Google Pvt. Ltd."
                          {...register(
                            `workExperience.${index}.companyName` as const,
                            {
                              required: {
                                value: true,
                                message: "Please enter the company name",
                              },
                              minLength: {
                                value: 3,
                                message: "Please enter a valid company name",
                              },
                            },
                          )}
                        />
                      </label>
                    </section>

                    {/* for designation */}
                    <section className="w-full">
                      <label
                        htmlFor={`workExperience.${index}.designation`}
                        className="font-semibold"
                      >
                        Designation
                        <input
                          id={`workExperience.${index}.designation`}
                          className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                            errors.workExperience &&
                            errors.workExperience[index]?.designation
                              ? "focus:outline-red-500"
                              : "focus:outline-teal-600 "
                          }`}
                          type="text"
                          placeholder="Frontend Developer"
                          {...register(
                            `workExperience.${index}.designation` as const,
                            {
                              required: {
                                value: true,
                                message: "Please enter the designation name",
                              },
                              minLength: {
                                value: 3,
                                message:
                                  "Please enter a valid role / designation",
                              },
                            },
                          )}
                        />
                      </label>
                    </section>

                    {/* for work duration */}
                    <section className="w-full">
                      <label
                        htmlFor={`workExperience.${index}.startDuration`}
                        className="font-semibold"
                      >
                        From
                        <input
                          id={`workExperience.${index}.startDuration`}
                          className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                            errors.workExperience &&
                            errors.workExperience[index]?.startDuration
                              ? "focus:outline-red-500"
                              : "focus:outline-teal-600 "
                          }`}
                          type="date"
                          {...register(
                            `workExperience.${index}.startDuration` as const,
                            {
                              required: {
                                value: true,
                                message: "Please enter the start date",
                              },
                            },
                          )}
                        />
                        To
                        <input
                          id={`workExperience.${index}.endDuration`}
                          className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                            errors.workExperience &&
                            errors.workExperience[index]?.endDuration
                              ? "focus:outline-red-500"
                              : "focus:outline-teal-600 "
                          }`}
                          type="date"
                          {...register(
                            `workExperience.${index}.endDuration` as const,
                            {
                              required: {
                                value: true,
                                message: "Please enter the start date",
                              },
                            },
                          )}
                        />
                      </label>
                    </section>

                    <button
                      className="px-3 py-1 font-bold border-2 border-black rounded-md"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Remove Company
                    </button>
                  </div>
                );
              })}
            </div>

            {/* button to submit the form */}
            <footer className="m-auto space-x-5 w-fit">
              <button
                type="button"
                className="px-5 py-2 font-bold border-2 border-black rounded-md "
                onClick={handlePreviousBtn}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-bold text-white bg-teal-600 border-2 border-teal-600 rounded-md"
              >
                Save and Next
              </button>
            </footer>
          </div>
        ) : (
          <button
            type="submit"
            className="self-center px-5 py-2 font-bold text-white bg-teal-600 border-2 border-teal-600 rounded-md w-fit"
          >
            Skip This Section
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkExperience;
