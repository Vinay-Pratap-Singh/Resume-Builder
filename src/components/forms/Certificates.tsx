import React, { FC, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

interface Iprops {
  currentStep: number;
  setCurrentStep: (number: number) => void;
}

interface Icertificate {
  certificateName: string;
  certificateLink: string;
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
      className="flex flex-col justify-center gap-10 w-full m-auto"
    >
      <div className="space-y-3 flex flex-col">
        {/* for checking user has certificate or not */}
        <section className="w-full flex gap-2 font-semibold items-center justify-center text-lg">
          <label htmlFor="hasCertificate" className="font-bold">
            <input
              id="hasCertificate"
              className="px-2 py-1 border-2 w-full font-normal focus:outline-teal-600  cursor-pointer"
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
                className="bg-teal-600 border-2 border-teal-600 text-white px-5 py-2 rounded-md font-bold"
                onClick={() =>
                  append({ certificateName: "", certificateLink: "" })
                }
              >
                Add Certificate
              </button>
            </div>

            {/* if user has certificate */}
            <div className="flex items-center justify-center flex-wrap gap-5">
              {fields.map((item, index) => {
                return (
                  <div key={item.id} className="w-80 space-y-3 flex flex-col">
                    <h1 className="font-bold text-xl">
                      Certificate {index + 1}
                    </h1>
                    <section className="w-full">
                      <label
                        htmlFor={`certificates.${index}.certificateName`}
                        className="font-bold"
                      >
                        Certificate Name
                        <input
                          id={`certificates.${index}.certificateName`}
                          className="px-2 py-1 border-2 w-full font-normal focus:outline-teal-600"
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
                        className="font-bold"
                      >
                        Certificate Link
                        <input
                          id={`certificates.${index}.certificateLink`}
                          className="px-2 py-1 border-2 w-full font-normal focus:outline-teal-600"
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
                      className="border-2 border-black px-3 py-1 rounded-md font-bold"
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
        ) : (
          <button
            type="submit"
            className="bg-teal-600 border-2 border-teal-600 text-white px-5 py-2 rounded-md font-bold w-fit self-center"
          >
            Skip This Section
          </button>
        )}
      </div>
    </form>
  );
};

export default Certificates;
