import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IformData {
  fullName: string;
  phoneNumber: string;
  city: string;
  state: string;
  language: string;
  interest: string;
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
    formState: { errors },
  } = useForm<IformData>({
    defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
  });

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
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
        <div className="space-y-3 w-80">
          <div className="space-y-3">
            <h1 className="text-xl font-bold">
              Enter Your Language Preferences
            </h1>

            {/* for user language preferences */}
            <section className="w-full">
              <label htmlFor="language" className="font-semibold">
                Languages
                <input
                  id="language"
                  className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                    errors.language
                      ? "focus:outline-red-500"
                      : "focus:outline-teal-600 "
                  }`}
                  type="text"
                  placeholder="Hindi, English"
                  {...register("language", {
                    required: {
                      value: true,
                      message: "* Please enter prefered languages",
                    },
                    minLength: {
                      value: 5,
                      message: "* Please enter a valid language name",
                    },
                  })}
                />
              </label>
              {errors.language && (
                <p className="text-red-500">{errors.language.message}</p>
              )}
            </section>
          </div>

          {/* for user hobbies */}
          <div className="space-y-3">
            <h1 className="text-xl font-bold">Enter Your Interest Area</h1>

            <section className="w-full">
              <label htmlFor="interest" className="font-semibold">
                Hobbies
                <input
                  id="interest"
                  className={`px-2 py-1 border-2 w-full font-normal mt-1 ${
                    errors.interest
                      ? "focus:outline-red-500"
                      : "focus:outline-teal-600 "
                  }`}
                  type="text"
                  placeholder="Playing Cricket, Listening Podcast"
                  {...register("interest", {
                    required: {
                      value: true,
                      message: "* Please enter your interest areas",
                    },
                    minLength: {
                      value: 3,
                      message: "* Please enter a valid interest area",
                    },
                  })}
                />
              </label>
              {errors.interest && (
                <p className="text-red-500">{errors.interest.message}</p>
              )}
            </section>
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
