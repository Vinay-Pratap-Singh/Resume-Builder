import { FC, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Icertificate } from "../../helper/interface";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

interface IformData {
  hasCertificate: boolean;
  certificates: Icertificate[];
}

const Certificates: FC<Iprops> = ({ currentStep, setCurrentStep }) => {
  // getting the data from local storage
  const storedData = localStorage.getItem("certificate");

  const { register, handleSubmit, control, watch } = useForm<IformData>({
    defaultValues: storedData ? { ...JSON.parse(storedData) } : {},
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  const [hasCertificate, setHasCertificate] = useState(
    storedData ? JSON.parse(storedData).hasCertificate : false,
  );

  // function to handle form submit through save and next button
  const onFormSubmit: SubmitHandler<IformData> = (data) => {
    // saving data to the local storage
    localStorage.setItem("certificate", JSON.stringify(data));
    setCurrentStep(currentStep + 1);
  };

  // function to handle the previous button
  const handlePreviousBtn = () => {
    if (currentStep === 0) {
      return;
    }
    const data = watch();
    // saving data to the local storage
    localStorage.setItem("certificate", JSON.stringify(data));
    setCurrentStep(currentStep - 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col justify-center w-full gap-5 m-auto lg:gap-10"
    >
      <div className="flex flex-col space-y-3">
        {/* for checking user has certificate or not */}
        <section className="flex items-center justify-center w-full gap-2 text-base font-semibold lg:text-lg">
          <label htmlFor="hasCertificate" className="font-bold">
            <input
              id="hasCertificate"
              className="w-full px-2 py-1 font-normal border-2 cursor-pointer focus:outline-teal-600"
              type="checkbox"
              {...register("hasCertificate")}
              onChange={(event) => setHasCertificate(event.target.checked)}
            />
          </label>
          Do you have any certificates to add?
        </section>

        {hasCertificate ? (
          <div className="flex flex-col items-center gap-5">
            <button
              type="button"
              className="px-3 py-1 text-sm font-semibold text-white transition-all duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md lg:font-bold lg:text-base lg:px-5 lg:py-2 hover:bg-teal-700 hover:border-teal-700"
              onClick={() =>
                append({ certificateName: "", certificateLink: "" })
              }
            >
              Add Certificate
            </button>

            {/* if user has certificate */}
            <div className="flex flex-wrap items-center justify-center gap-5 px-2 lg:px-0">
              {fields.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="relative flex flex-col justify-between w-full p-2 space-y-3 rounded-md shadow-md lg:p-4 md:w-96"
                  >
                    <h1 className="text-lg font-bold lg:text-xl">
                      Certificate {index + 1}
                    </h1>
                    <section className="w-full">
                      <label
                        htmlFor={`certificates.${index}.certificateName`}
                        className="text-sm font-semibold lg:text-base"
                      >
                        Certificate Name
                        <input
                          id={`certificates.${index}.certificateName`}
                          className="w-full px-2 py-1 mt-1 font-normal border-2 focus:outline-teal-600"
                          type="text"
                          placeholder="Full Stack JavaScript Bootcamp"
                          {...register(
                            `certificates.${index}.certificateName` as const,
                            {
                              required: {
                                value: true,
                                message: "Please enter the internship name",
                              },
                            },
                          )}
                        />
                      </label>
                    </section>

                    <section className="w-full">
                      <label
                        htmlFor={`certificates.${index}.certificateLink`}
                        className="text-sm font-semibold lg:text-base"
                      >
                        Certificate Link
                        <input
                          id={`certificates.${index}.certificateLink`}
                          className="w-full px-2 py-1 mt-1 font-normal border-2 focus:outline-teal-600"
                          type="text"
                          placeholder="https://drive.google.com/drive/my-drive"
                          {...register(
                            `certificates.${index}.certificateLink` as const,
                            {
                              // required:{value:true,message:"Please enter the certificate link"},pattern:{value:"",message:"Please enter a valid link"}
                            },
                          )}
                        />
                      </label>
                    </section>

                    <button
                      className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out bg-red-500 rounded-md lg:text-base lg:font-bold hover:bg-red-600"
                      type="button"
                      onClick={() => remove(index)}
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
                      Remove Certificate
                    </button>
                  </div>
                );
              })}
            </div>

            {/* button to submit the form */}
            <footer className="m-auto space-x-5 w-fit">
              <button
                type="button"
                className="px-3 py-1 text-sm font-semibold transition-all duration-200 ease-in-out border-2 border-black rounded-md lg:px-5 lg:py-2 lg:font-bold lg:text-base hover:bg-gray-100"
                onClick={handlePreviousBtn}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm font-semibold text-white transition-all duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md lg:px-5 lg:py-2 lg:font-bold lg:text-base hover:border-teal-700 hover:bg-teal-700"
              >
                Save and Next
              </button>
            </footer>
          </div>
        ) : (
          <button
            type="submit"
            className="self-center px-5 py-2 font-bold text-white transition-all duration-200 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-md hover:border-teal-700 hover:bg-teal-700 w-fit"
          >
            Skip This Section
          </button>
        )}
      </div>
    </form>
  );
};

export default Certificates;
