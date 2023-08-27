import React, { FC } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

interface IformData {
  projects: {
    projectName: string;
    projectTechnology: string;
    projectDescription: string;
  }[];
}

const Projects: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("projects");
  if (storedData) {
    console.log(JSON.parse(storedData));
  }

  const { register, handleSubmit, control, watch } = useForm<IformData>({
    defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
    if (
      data.projects.length === 0 ||
      data.projects[0]?.projectName === "" ||
      data.projects[0]?.projectDescription === "" ||
      data.projects[0]?.projectTechnology === ""
    ) {
      alert("Please add atleast one project");
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
      className="flex flex-col justify-center gap-10 w-fit m-auto"
    >
      {/* container for project */}
      <div className="flex flex-col gap-10">
        <div className="self-center">
          <button
            type="button"
            className="bg-teal-600 border-2 border-teal-600 text-white px-5 py-2 rounded-md font-bold"
            onClick={() =>
              append({
                projectName: "",
                projectTechnology: "",
                projectDescription: "",
              })
            }
          >
            Add Project
          </button>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-5">
          {fields.map((item, index) => {
            return (
              <div key={item.id} className="w-80 space-y-3 flex flex-col">
                <h1 className="font-bold text-xl">Project {index + 1}</h1>
                {/* project name */}
                <section className="w-full">
                  <label
                    htmlFor={`projects.${index}.projectName`}
                    className="font-semibold"
                  >
                    Project Name
                    <input
                      id={`projects.${index}.projectName`}
                      className="px-2 py-1 mt-1 border-2 w-full font-normal focus:outline-teal-600"
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
                      className="px-2 py-1 mt-1 border-2 w-full font-normal focus:outline-teal-600"
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
                      className="px-2 py-1 mt-1 border-2 w-full font-normal focus:outline-teal-600"
                      type="text"
                      placeholder="It is a popular game"
                      {...register(
                        `projects.${index}.projectDescription` as const,
                      )}
                    />
                  </label>
                </section>

                <button
                  className="border-2 border-black px-3 py-1 rounded-md font-bold"
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
        <footer className="w-fit m-auto space-x-5">
          <button
            type="button"
            className="border-2 border-black px-5 py-2 rounded-md font-bold "
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
      </div>
    </form>
  );
};

export default Projects;
