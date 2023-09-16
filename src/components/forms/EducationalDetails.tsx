import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IeducationalDetails } from "../../helper/interface";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

const EducationalDetails: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("educationalDetails");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IeducationalDetails>({
    defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
  });

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IeducationalDetails> = (data) => {
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
      toast.error("Invalid date");
      return;
    }

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
      className="flex flex-col justify-center gap-5 lg:gap-10"
    >
      {/* for educational details */}
      <section className="grid justify-center grid-cols-1 gap-5 px-2 m-auto lg:gap-10 md:grid-cols-2">
        {/* for high school details */}
        <div className="w-full space-y-3">
          <h1 className="text-lg font-bold lg:text-xl">
            Enter Your High School Details
          </h1>

          {/* for high school name */}
          <section className="w-full">
            <label
              htmlFor="highSchool"
              className="text-sm font-semibold lg:text-base"
            >
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
              <p className="text-sm text-red-500 lg:text-base">
                {errors.highSchool.name.message}
              </p>
            )}
          </section>

          {/* for high school start date */}
          <section className="w-full">
            <label
              htmlFor="highSchoolStartData"
              className="text-sm font-semibold lg:text-base"
            >
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
              <p className="text-sm text-red-500 lg:text-base">
                {errors.highSchool.startDate.message}
              </p>
            )}
          </section>

          {/* for high school end date */}
          <section className="w-full">
            <label
              htmlFor="highSchoolEndData"
              className="text-sm font-semibold lg:text-base"
            >
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
              <p className="text-sm text-red-500 lg:text-base">
                {errors.highSchool.endDate.message}
              </p>
            )}
          </section>
        </div>

        {/* for 10 + 2 */}
        <div className="w-full space-y-3">
          <h1 className="text-lg font-bold lg:text-xl">
            Enter Your (10 + 2) Details
          </h1>

          {/* for 10 + 2 name */}
          <section className="w-full">
            <label
              htmlFor="intermediate"
              className="text-sm font-semibold lg:text-base"
            >
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
              <p className="text-sm text-red-500 lg:text-base">
                {errors.intermediate.name.message}
              </p>
            )}
          </section>

          {/* for 10 + 2 start date */}
          <section className="w-full">
            <label
              htmlFor="intermediateStartData"
              className="text-sm font-semibold lg:text-base"
            >
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
              <p className="text-sm text-red-500 lg:text-base">
                {errors.intermediate.startDate.message}
              </p>
            )}
          </section>

          {/* for 10 + 2 end date */}
          <section className="w-full">
            <label
              htmlFor="intermediateEndData"
              className="text-sm font-semibold lg:text-base"
            >
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
              <p className="text-sm text-red-500 lg:text-base">
                {errors.intermediate.endDate.message}
              </p>
            )}
          </section>
        </div>

        {/* for graduation */}
        <div className="w-full space-y-3">
          <h1 className="text-lg font-bold lg:text-xl">
            Enter Your Graduation Details (Optional)
          </h1>

          {/* for graduation name */}
          <section className="w-full">
            <label
              htmlFor="graduationName"
              className="text-sm font-semibold lg:text-base"
            >
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
            <label
              htmlFor="graduationStartData"
              className="text-sm font-semibold lg:text-base"
            >
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
            <label
              htmlFor="graduationEndData"
              className="text-sm font-semibold lg:text-base"
            >
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
        <div className="w-full space-y-3">
          <h1 className="text-lg font-bold lg:text-xl">
            Enter Post Graduation Details (Optional)
          </h1>

          {/* for postgraduation name */}
          <section className="w-full">
            <label
              htmlFor="postgraduationName"
              className="text-sm font-semibold lg:text-base"
            >
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
            <label
              htmlFor="postgraduationStartData"
              className="text-sm font-semibold lg:text-base"
            >
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
            <label
              htmlFor="postgraduationEndData"
              className="text-sm font-semibold lg:text-base"
            >
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
      </section>

      {/* button to submit the form */}
      <footer className="m-auto space-x-5 w-fit">
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

export default EducationalDetails;
