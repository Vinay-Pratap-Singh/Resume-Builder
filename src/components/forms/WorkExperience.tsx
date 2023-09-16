import { FC, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
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

  const addWork = (worksIndex: number) => {
    const data = watch("workExperience");
    const workDoneArray = data[worksIndex].workDone || [];
    workDoneArray.push("");
    const updatedFields = [...data];
    updatedFields[worksIndex].workDone = [...workDoneArray];
    reset({ workExperience: updatedFields });
  };

  const removeWork = (worksIndex: number, work: number) => {
    const data = watch("workExperience");
    const workArray = data[worksIndex].workDone || [];
    workArray.splice(work, 1);
    const updatedFields = [...data];
    updatedFields[worksIndex].workDone = workArray;
    reset({ workExperience: updatedFields });
  };

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
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
      className="flex flex-col justify-center w-full gap-5 m-auto lg:gap-10"
    >
      <div className="flex flex-col space-y-3">
        {/* for checking user has experience or not */}
        <section className="flex items-center justify-center w-full gap-2 text-base font-semibold lg:text-lg">
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
            {/* button to add experience */}
            <button
              type="button"
              className="px-3 py-1 text-sm font-semibold text-white transition-all duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md lg:font-bold lg:text-base lg:px-5 lg:py-2 hover:bg-teal-700 hover:border-teal-700"
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

            {/* if user has experience */}
            <div className="flex flex-wrap items-stretch self-stretch justify-center gap-5 px-2 lg:px-0">
              {fields.map((works: any, worksIndex) => (
                <div
                  key={works.id}
                  className="relative flex flex-col justify-between w-full p-2 space-y-3 rounded-md shadow-md lg:p-4 md:w-96"
                >
                  {/* for work experience details */}
                  <div className="flex flex-col gap-3">
                    <h1 className="text-lg font-bold lg:text-xl">
                      Company {worksIndex + 1}
                    </h1>

                    {/* for company name */}
                    <Controller
                      name={`workExperience.${worksIndex}.companyName`}
                      control={control}
                      defaultValue=""
                      rules={{
                        required: {
                          value: true,
                          message: "Please enter the company name",
                        },
                        minLength: {
                          value: 3,
                          message: "Please enter a valid company name",
                        },
                      }}
                      render={({ field }: any) => (
                        <label
                          htmlFor={`workExperience.${worksIndex}.companyName`}
                          className="text-sm font-semibold lg:text-base"
                        >
                          Company Name
                          <input
                            {...field}
                            placeholder="Company Name"
                            type="text"
                            id={`workExperience.${worksIndex}.companyName`}
                            className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                              errors.workExperience &&
                              errors.workExperience[worksIndex]?.companyName
                                ?.message
                                ? "focus:outline-red-500"
                                : "focus:outline-teal-600 "
                            }`}
                          />
                        </label>
                      )}
                    />

                    {/* for designation */}
                    <Controller
                      name={`workExperience.${worksIndex}.designation`}
                      control={control}
                      defaultValue=""
                      rules={{
                        required: {
                          value: true,
                          message: "Please enter the company designation",
                        },
                        minLength: {
                          value: 3,
                          message: "Please enter a valid designation",
                        },
                      }}
                      render={({ field }: any) => (
                        <label
                          className="text-sm font-semibold lg:text-base"
                          htmlFor={`workExperience.${worksIndex}.designation`}
                        >
                          Job Role
                          <input
                            name={`workExperience.${worksIndex}.designation`}
                            {...field}
                            placeholder="Use chatGPT for better description"
                            id={`workExperience.${worksIndex}.designation`}
                            className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                              errors.workExperience &&
                              errors.workExperience[worksIndex]?.designation
                                ?.message
                                ? "focus:outline-red-500"
                                : "focus:outline-teal-600"
                            }`}
                          />
                        </label>
                      )}
                    />

                    {/* for start duration */}
                    <Controller
                      name={`workExperience.${worksIndex}.startDuration`}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Please enter the joining date",
                        },
                      }}
                      render={({ field }: any) => (
                        <label
                          htmlFor={`workExperience.${worksIndex}.startDuration`}
                          className="text-sm font-semibold lg:text-base"
                        >
                          From (Joining Date)
                          <input
                            {...field}
                            type="date"
                            id={`workExperience.${worksIndex}.startDuration`}
                            className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                              errors.workExperience &&
                              errors.workExperience[worksIndex]?.startDuration
                                ?.message
                                ? "focus:outline-red-500"
                                : "focus:outline-teal-600 "
                            }`}
                          />
                        </label>
                      )}
                    />

                    {/* for end duration */}
                    <Controller
                      name={`workExperience.${worksIndex}.endDuration`}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Please enter the sepration date",
                        },
                      }}
                      render={({ field }: any) => (
                        <label
                          htmlFor={`workExperience.${worksIndex}.endDuration`}
                          className="text-sm font-semibold lg:text-base"
                        >
                          To (Sepration Date)
                          <input
                            {...field}
                            type="date"
                            id={`workExperience.${worksIndex}.endDuration`}
                            className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                              errors.workExperience &&
                              errors.workExperience[worksIndex]?.endDuration
                                ?.message
                                ? "focus:outline-red-500"
                                : "focus:outline-teal-600 "
                            }`}
                          />
                        </label>
                      )}
                    />

                    {/* for work done */}
                    <div className="flex flex-col gap-0">
                      {/* for title and add button */}
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold lg:text-base">
                          Your contribution
                        </h4>
                        {/* button to add tech */}
                        <button
                          type="button"
                          className="font-bold text-white bg-teal-600 rounded-full w-fit hover:bg-teal-700"
                          onClick={() => addWork(worksIndex)}
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

                      {/* for displaying all the work done */}
                      {Array.isArray(works?.workDone) &&
                        works.workDone.map((work: any, workIndex: number) => (
                          <section key={work?.id} className="w-full">
                            <Controller
                              name={`workExperience.${worksIndex}.workDone.${workIndex}`}
                              control={control}
                              defaultValue=""
                              render={({ field }: any) => (
                                <div className="flex items-center w-full">
                                  <label
                                    className="w-full text-sm font-semibold lg:text-base"
                                    htmlFor={`workExperience.${worksIndex}.workDone.${workIndex}`}
                                  >
                                    <div className="flex items-center w-full">
                                      <input
                                        id={`workExperience.${worksIndex}.workDone.${workIndex}`}
                                        {...field}
                                        placeholder="Added dark mode support in website"
                                        className={`px-2 py-1 mt-1 border-2 font-normal w-full peer ${
                                          errors?.workExperience &&
                                          errors?.workExperience[worksIndex]
                                            ?.workDone &&
                                          errors.workExperience[worksIndex]
                                            ?.workDone?.[workIndex]?.message
                                            ? "focus:outline-red-500"
                                            : "focus:outline-teal-600"
                                        }`}
                                      />
                                      {/* button to remove work */}
                                      <button
                                        className={`h-full px-2 py-1 mt-1 font-bold text-red-500 border-2 border-l-0 border-gray-300 ${
                                          errors?.workExperience &&
                                          errors?.workExperience[worksIndex]
                                            ?.workDone &&
                                          errors.workExperience[worksIndex]
                                            ?.workDone?.[workIndex]?.message
                                            ? "peer-focus:border-red-500"
                                            : "peer-focus:border-teal-600"
                                        } hover:text-red-600 w-fit`}
                                        type="button"
                                        onClick={() =>
                                          removeWork(worksIndex, workIndex)
                                        }
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
                                    </div>
                                  </label>
                                </div>
                              )}
                            />
                          </section>
                        ))}
                    </div>
                  </div>

                  {/* button to remove work experience */}
                  <button
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out bg-red-500 rounded-md lg:text-base lg:font-bold hover:bg-red-600"
                    type="button"
                    onClick={() => remove(worksIndex)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Remove Company Experience
                  </button>
                </div>
              ))}
            </div>

            {/* button to submit the form */}
            <footer className="m-auto space-x-5 w-fit">
              <button
                type="button"
                className="px-3 py-1 text-sm font-semibold transition-all duration-200 ease-in-out border-2 border-black rounded-md lg:text-base lg:font-bold lg:px-5 lg:py-2 hover:bg-gray-100"
                onClick={handlePreviousBtn}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm font-semibold text-white duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md lg:text-base lg:font-bold lg:px-5 lg:py-2 hover:bg-teal-700 hover:border-teal-700"
              >
                Save and Next
              </button>
            </footer>
          </div>
        ) : (
          <button
            type="submit"
            className="self-center px-3 py-1 font-bold text-white duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md lg:px-5 lg:py-2 w-fit hover:bg-teal-700 hover:border-teal-700"
          >
            Skip This Section
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkExperience;
