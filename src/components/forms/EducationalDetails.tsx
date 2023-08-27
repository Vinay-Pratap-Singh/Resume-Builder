import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IformData {
  highSchool: {
    name: string;
    startDate: Date;
    endDate: Date;
  };
  intermediate: {
    name: string;
    startDate: Date;
    endDate: Date;
  };
  graduation?: {
    name: string;
    startDate: Date;
    endDate: Date | string;
  };
  postGraduation?: {
    name: string;
    startDate: Date;
    endDate: Date | string;
  };
}

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

const EducationalDetails: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("educationalDetails");
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
    if (
      data.highSchool.endDate <= data.highSchool.startDate ||
      data.intermediate.endDate <= data.intermediate.startDate ||
      (data.graduation?.startDate &&
        data.graduation?.endDate &&
        data.graduation?.startDate > data.graduation?.endDate) ||
      (data.postGraduation?.startDate &&
        data.postGraduation?.endDate &&
        data.postGraduation?.startDate > data.postGraduation?.endDate)
    ) {
      alert("Invalid date");
      return;
    }

    console.log(data);
    // saving data to the local storage
    localStorage.setItem("educationalDetails", JSON.stringify(data));
    setCurrentStep(currentStep + 1);
  };

  // function to handle the previous button
  const handlePreviousBtn = () => {
    if (currentStep === 0) {
      return;
    }
    const data = watch();
    // saving data to the local storage
    localStorage.setItem("educationalDetails", JSON.stringify(data));
    setCurrentStep(currentStep - 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col justify-center gap-10"
    >
      {/* for educational details */}
      <header className="w-fit m-auto grid grid-cols-2 gap-10 justify-center">
        {/* for high school details */}
        <div className="space-y-3 w-96">
          <h1 className="font-bold text-xl">Enter Your High School Details</h1>

          {/* for high school name */}
          <section className="w-full">
            <label htmlFor="highSchool" className="font-semibold">
              School Name
              <input
                id="highSchool"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.highSchool?.name
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Oxford Public School"
                {...register("highSchool.name", {
                  required: {
                    value: true,
                    message: "* Please enter your college name",
                  },
                  minLength: {
                    value: 5,
                    message: "* College name should have atleast 5 characters",
                  },
                })}
              />
            </label>
            {errors.highSchool?.name && (
              <p className="text-red-500">{errors.highSchool.name.message}</p>
            )}
          </section>

          {/* for high school start date */}
          <section className="w-full">
            <label htmlFor="highSchoolStartData" className="font-semibold">
              Start Date
              <input
                id="highSchoolStartData"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.highSchool?.startDate
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="date"
                {...register("highSchool.startDate", {
                  required: {
                    value: true,
                    message: "* Please enter your high school start date",
                  },
                })}
              />
            </label>
            {errors.highSchool?.startDate && (
              <p className="text-red-500">
                {errors.highSchool.startDate.message}
              </p>
            )}
          </section>

          {/* for high school end date */}
          <section className="w-full">
            <label htmlFor="highSchoolEndData" className="font-semibold">
              End Date
              <input
                id="highSchoolEndData"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.highSchool?.endDate
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="date"
                {...register("highSchool.endDate", {
                  required: {
                    value: true,
                    message: "* Please enter your high school end date",
                  },
                })}
              />
            </label>
            {errors.highSchool?.endDate && (
              <p className="text-red-500">
                {errors.highSchool.endDate.message}
              </p>
            )}
          </section>
        </div>

        {/* for 10 + 2 */}
        <div className="space-y-3 w-96">
          <h1 className="font-bold text-xl">Enter Your (10 + 2) Details</h1>

          {/* for 10 + 2 name */}
          <section className="w-full">
            <label htmlFor="intermediate" className="font-semibold">
              School Name
              <input
                id="intermediate"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.intermediate?.name
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Oxford Public School"
                {...register("intermediate.name", {
                  required: {
                    value: true,
                    message: "* Please enter your college name",
                  },
                  minLength: {
                    value: 5,
                    message: "* College name should have atleast 5 characters",
                  },
                })}
              />
            </label>
            {errors.intermediate?.name && (
              <p className="text-red-500">{errors.intermediate.name.message}</p>
            )}
          </section>

          {/* for 10 + 2 start date */}
          <section className="w-full">
            <label htmlFor="intermediateStartData" className="font-semibold">
              Start Date
              <input
                id="intermediateStartData"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.intermediate?.startDate
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="date"
                {...register("intermediate.startDate", {
                  required: {
                    value: true,
                    message: "* Please enter your intermediate start date",
                  },
                })}
              />
            </label>
            {errors.intermediate?.startDate && (
              <p className="text-red-500">
                {errors.intermediate.startDate.message}
              </p>
            )}
          </section>

          {/* for 10 + 2 end date */}
          <section className="w-full">
            <label htmlFor="intermediateEndData" className="font-semibold">
              End Date
              <input
                id="intermediateEndData"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.intermediate?.endDate
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="date"
                {...register("intermediate.endDate", {
                  required: {
                    value: true,
                    message: "* Please enter your intermediate end date",
                  },
                })}
              />
            </label>
            {errors.intermediate?.endDate && (
              <p className="text-red-500">
                {errors.intermediate.endDate.message}
              </p>
            )}
          </section>
        </div>

        {/* for graduation */}
        <div className="space-y-3 w-96">
          <h1 className="font-bold text-xl">
            Enter Your Graduation Details (Optional)
          </h1>

          {/* for graduation name */}
          <section className="w-full">
            <label htmlFor="graduationName" className="font-semibold">
              College Name
              <input
                id="graduationName"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.graduation?.name
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Oxford Public School"
                {...register("graduation.name")}
              />
            </label>
          </section>

          {/* for graduation start date */}
          <section className="w-full">
            <label htmlFor="graduationStartData" className="font-semibold">
              Start Date
              <input
                id="graduationStartData"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.graduation?.startDate
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="date"
                {...register("graduation.startDate")}
              />
            </label>
          </section>

          {/* for graduation end date */}
          <section className="w-full">
            <label htmlFor="graduationEndData" className="font-semibold">
              End Date
              <input
                id="graduationEndData"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.graduation?.endDate
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="date"
                {...register("graduation.endDate")}
              />
            </label>
          </section>
        </div>

        {/* for postgraduation */}
        <div className="space-y-3 w-96">
          <h1 className="font-bold text-xl">
            Enter Post Graduation Details (Optional)
          </h1>

          {/* for postgraduation name */}
          <section className="w-full">
            <label htmlFor="postgraduationName" className="font-semibold">
              College Name
              <input
                id="postgraduationName"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.postGraduation?.name
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="text"
                placeholder="Oxford Public School"
                {...register("postGraduation.name")}
              />
            </label>
          </section>

          {/* for postgraduation start date */}
          <section className="w-full">
            <label htmlFor="postgraduationStartData" className="font-semibold">
              Start Date
              <input
                id="postgraduationStartData"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.postGraduation?.startDate
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="date"
                {...register("postGraduation.startDate")}
              />
            </label>
          </section>

          {/* for postgraduation end date */}
          <section className="w-full">
            <label htmlFor="postgraduationEndData" className="font-semibold">
              End Date
              <input
                id="postgraduationEndData"
                className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                  errors.postGraduation?.endDate
                    ? "focus:outline-red-500"
                    : "focus:outline-teal-600 "
                }`}
                type="date"
                {...register("postGraduation.endDate")}
              />
            </label>
          </section>
        </div>
      </header>

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
    </form>
  );
};

export default EducationalDetails;
