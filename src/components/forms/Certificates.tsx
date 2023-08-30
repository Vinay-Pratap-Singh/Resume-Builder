import React, { FC, useState } from "react";
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
  if (storedData) {
    console.log(JSON.parse(storedData));
  }

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
    console.log(data);
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
      className="flex flex-col justify-center w-full gap-10 m-auto"
    >
      <div className="flex flex-col space-y-3">
        {/* for checking user has certificate or not */}
        <section className="flex items-center justify-center w-full gap-2 text-lg font-semibold">
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
            <div>
              <button
                type="button"
                className="px-5 py-2 font-bold text-white bg-teal-600 border-2 border-teal-600 rounded-md"
                onClick={() =>
                  append({ certificateName: "", certificateLink: "" })
                }
              >
                Add Certificate
              </button>
            </div>

            {/* if user has certificate */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              {fields.map((item, index) => {
                return (
                  <div key={item.id} className="flex flex-col space-y-3 w-80">
                    <h1 className="text-xl font-bold">
                      Certificate {index + 1}
                    </h1>
                    <section className="w-full">
                      <label
                        htmlFor={`certificates.${index}.certificateName`}
                        className="font-semibold"
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
                        className="font-semibold"
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
                      className="px-3 py-1 font-bold border-2 border-black rounded-md"
                      type="button"
                      onClick={() => remove(index)}
                    >
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

export default Certificates;
