import React, { FC } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

interface Iproject {
  projectName: string;
  projectTechnology: string[];
  projectDescription: string;
}

interface IformData {
  projects: Iproject[];
}

const Projects: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("projects");
  if (storedData) {
    console.log(JSON.parse(storedData));
  }

  const { register, handleSubmit, control, watch, setValue } =
    useForm<IformData>({
      defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
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
    console.log(data);
    // saving data to the local storage
    localStorage.setItem("projects", JSON.stringify(data));
    setCurrentStep(currentStep + 1);
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
      className="flex flex-col justify-center gap-10 m-auto w-fit"
    >
      {/* container for project */}

      <div className="flex flex-col gap-10">
        <div className="self-center">
          <button
            type="button"
            className="px-5 py-2 font-bold text-white bg-teal-600 border-2 border-teal-600 rounded-md"
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
        <div className="flex flex-wrap items-center justify-center gap-5">
          {fields.map((project, index: number) => {
            return (
              <div key={project?.id} className="flex flex-col space-y-3 w-80">
                <h1 className="text-xl font-bold">Project {index + 1}</h1>
                {/* project name */}
                <section className="w-full">
                  <label
                    htmlFor={`projects.${index}.projectName`}
                    className="font-semibold"
                  >
                    Project Name
                    <input
                      id={`projects.${index}.projectName`}
                      className="w-full px-2 py-1 mt-1 font-normal border-2 focus:outline-teal-600"
                      type="text"
                      placeholder="Snake Game"
                      {...register(`projects.${index}.projectName` as const)}
                    />
                  </label>
                </section>

                {/* technology used in project */}
                <section className="w-full">
                  <label
                    htmlFor={`projects.${index}.projectTechnology`}
                    className="font-semibold"
                  >
                    Technology Used
                    <input
                      id={`projects.${index}.projectTechnology`}
                      className="w-full px-2 py-1 mt-1 font-normal border-2 focus:outline-teal-600"
                      type="text"
                      placeholder="HTML, CSS, JS"
                      {...register(
                        `projects.${index}.projectTechnology` as const,
                      )}
                    />
                  </label>
                </section>

                {/* project description */}
                <section className="w-full">
                  <label
                    htmlFor={`projects.${index}.projectDescription`}
                    className="font-semibold"
                  >
                    Project Description
                    <input
                      id={`projects.${index}.projectDescription`}
                      className="w-full px-2 py-1 mt-1 font-normal border-2 focus:outline-teal-600"
                      type="text"
                      placeholder="It is a popular game"
                      {...register(
                        `projects.${index}.projectDescription` as const,
                      )}
                    />
                  </label>
                </section>

                <button
                  className="px-3 py-1 font-bold border-2 border-black rounded-md"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove Project
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
    </form>
  );
};

export default Projects;
