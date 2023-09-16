import { FC } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { Iproject } from "../../helper/interface";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

interface IformData {
  projects: Iproject[];
}

const Projects: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("projects");
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<IformData>({
    defaultValues: storedData
      ? { ...JSON.parse(storedData) }
      : { projects: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
    if (data.projects.length === 0) {
      toast.error("Please add atleast one project");
      return;
    }
    // saving data to the local storage
    localStorage.setItem("projects", JSON.stringify(data));
    setCurrentStep(currentStep + 1);
  };

  const addTech = (projectIndex: number) => {
    const data = watch("projects");
    const techArray = data[projectIndex].projectTechnology || [];
    techArray.push("");
    const updatedFields = [...data];
    updatedFields[projectIndex].projectTechnology = [...techArray];
    reset({ projects: updatedFields });
  };

  const removeTech = (projectIndex: number, techIndex: number) => {
    const data = watch("projects");
    const techArray = data[projectIndex].projectTechnology || [];
    techArray.splice(techIndex, 1);
    const updatedFields = [...data];
    updatedFields[projectIndex].projectTechnology = techArray;
    reset({ projects: updatedFields });
  };

  // function to handle the previous button
  const handlePreviousBtn = () => {
    if (currentStep === 0) {
      return;
    }
    const data = watch();
    // saving data to the local storage
    localStorage.setItem("projects", JSON.stringify(data));
    setCurrentStep(currentStep - 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col justify-center gap-5 m-auto lg:gap-10 w-fit"
    >
      {/* container for project */}
      <div className="flex flex-col gap-5 lg:gap-10">
        {/* button for adding new project */}
        <div className="self-center">
          <button
            type="button"
            className="px-3 py-1 text-sm font-semibold text-white bg-teal-600 border-2 border-teal-600 rounded-md lg:px-5 lg:py-2 lg:font-bold lg:text-base"
            onClick={() =>
              append({
                projectName: "",
                projectTechnology: [],
                projectDescription: "",
              })
            }
          >
            Add Project
          </button>
        </div>

        {/* mapping the projects data to display */}
        <div className="flex flex-wrap items-center justify-center gap-5 px-2 md:px-0">
          {fields.map((project: any, projectIndex) => (
            <div
              key={project.id}
              className="flex flex-col self-start w-full p-2 space-y-3 rounded-md shadow-md lg:p-4 md:w-96"
            >
              <h1 className="text-lg font-bold lg:text-xl">
                Project {projectIndex + 1}
              </h1>
              {/* for project name */}
              <Controller
                name={`projects.${projectIndex}.projectName`}
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Please enter the project name",
                  },
                  minLength: {
                    value: 3,
                    message: "Please enter a valid project name",
                  },
                }}
                render={({ field }: any) => (
                  <label
                    htmlFor={`projects.${projectIndex}.projectName`}
                    className="text-sm font-semibold lg:text-base"
                  >
                    Project Name
                    <input
                      {...field}
                      placeholder="Project Name"
                      type="text"
                      id={`projects.${projectIndex}.projectName`}
                      className={`px-2 py-1 mt-1 border-2 w-full font-normal ${
                        errors.projects &&
                        errors.projects[projectIndex]?.projectName?.message
                          ? "focus:outline-red-500"
                          : "focus:outline-teal-600 "
                      }`}
                    />
                  </label>
                )}
              />

              {/* for project description */}
              <Controller
                name={`projects.${projectIndex}.projectDescription`}
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Please enter the project description",
                  },
                  minLength: {
                    value: 20,
                    message: "Please enter a valid project description",
                  },
                }}
                render={({ field }: any) => (
                  <label
                    className="text-sm font-semibold lg:text-base"
                    htmlFor={`projects.${projectIndex}.projectDescription`}
                  >
                    Project Description
                    <textarea
                      {...field}
                      placeholder="Use chatGPT for better description"
                      id={`projects.${projectIndex}.projectDescription`}
                      className={`px-2 py-1 mt-1 border-2 w-full font-normal resize-none h-40 ${
                        errors.projects &&
                        errors.projects[projectIndex]?.projectDescription
                          ?.message
                          ? "focus:outline-red-500"
                          : "focus:outline-teal-600"
                      }`}
                    />
                  </label>
                )}
              />

              {/* for projects technology used */}
              <div className="flex flex-col gap-0">
                {/* for title and add button */}
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold lg:text-base">
                    Technologies Used
                  </h4>
                  {/* button to add tech */}
                  <button
                    type="button"
                    className="font-bold text-white bg-teal-600 rounded-full w-fit hover:bg-teal-700"
                    onClick={() => addTech(projectIndex)}
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

                {/* for displaying all the tech stacks */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {Array.isArray(project?.projectTechnology) &&
                    project.projectTechnology.map(
                      (tech: any, techIndex: number) => (
                        <section key={tech?.id}>
                          <Controller
                            name={`projects.${projectIndex}.projectTechnology.${techIndex}`}
                            control={control}
                            defaultValue=""
                            render={({ field }: any) => (
                              <div className="flex items-center w-fit">
                                <label
                                  className="text-sm font-semibold lg:text-base"
                                  htmlFor={`projects.${projectIndex}.projectTechnology.${techIndex}`}
                                >
                                  <div className="flex items-center">
                                    <input
                                      id={`projects.${projectIndex}.projectTechnology.${techIndex}`}
                                      {...field}
                                      placeholder="Tech"
                                      className={`px-2 py-1 mt-1 border-2 font-normal w-[4.3rem] peer ${
                                        errors?.projects &&
                                        errors?.projects[projectIndex]
                                          ?.projectTechnology &&
                                        errors.projects[projectIndex]
                                          ?.projectTechnology?.[techIndex]
                                          ?.message
                                          ? "focus:outline-red-500"
                                          : "focus:outline-teal-600"
                                      }`}
                                    />
                                    {/* button to remove tech */}
                                    <button
                                      className={`h-full px-2 py-1 mt-1 font-bold text-red-500 border-2 border-l-0 border-gray-300 ${
                                        errors?.projects &&
                                        errors?.projects[projectIndex]
                                          ?.projectTechnology &&
                                        errors.projects[projectIndex]
                                          ?.projectTechnology?.[techIndex]
                                          ?.message
                                          ? "peer-focus:border-red-500"
                                          : "peer-focus:border-teal-600"
                                      } hover:text-red-600 w-fit`}
                                      type="button"
                                      onClick={() =>
                                        removeTech(projectIndex, techIndex)
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
                      ),
                    )}
                </div>
              </div>

              {/* button to remove project */}
              <button
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out bg-red-500 rounded-md lg:font-bold lg:text-base hover:bg-red-600"
                type="button"
                onClick={() => remove(projectIndex)}
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
                Remove Project
              </button>
            </div>
          ))}
        </div>

        {/* button to submit the form */}
        <footer className="m-auto space-x-5 w-fit">
          <button
            type="button"
            className="px-3 py-1 text-sm font-semibold transition-all duration-200 ease-in-out bg-gray-100 border-2 border-black rounded-md lg:font-bold lg:text-base lg:px-5 lg:py-2"
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
      </div>
    </form>
  );
};

export default Projects;
