import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import {
  Icertificate,
  IpreviewData,
  Iproject,
  IworkExperience,
} from "../../helper/interface";

interface Iprops {
  data: IpreviewData;
}

const Template1 = ({ data }: Iprops) => {
  const [templateColor, setTemplateColor] = useState("gray");

  // getting the template color from local storage
  useEffect(() => {
    const color = localStorage.getItem("templateColor");
    if (color) {
      setTemplateColor(color);
    }
  }, []);

  return (
    <div
      className={`m-5 border-2 rounded-md ${
        templateColor === "gray"
          ? "border-gray-700"
          : templateColor === "teal"
          ? "border-teal-700"
          : "border-cyan-700"
      }`}
    >
      {/* creating the resume header */}
      <header className="p-5">
        <h1 className="text-3xl font-bold">
          {data?.personalDetails?.fullName}
        </h1>
        <h4 className="text-lg font-semibold text-gray-600">
          {data?.personalDetails?.role}
        </h4>
        <p>{data?.personalDetails?.bio}</p>
      </header>

      {/* for social links */}
      <section
        className={`grid grid-cols-2 p-5 text-white ${
          templateColor === "gray"
            ? "bg-gray-700"
            : templateColor === "teal"
            ? "bg-teal-700"
            : "bg-cyan-700"
        } gap-y-2 gap-x-5`}
      >
        {/* for email */}
        <div>
          <Link
            to={data?.socialLinks?.email}
            className="flex items-center gap-2"
          >
            <i className="fa-solid fa-envelope" />
            <p className="mb-1">{data?.socialLinks?.email}</p>
          </Link>
        </div>

        {/* for phone number */}
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-phone" />
          <p className="mb-1">{data?.socialLinks?.phoneNumber}</p>
        </div>

        {/* github */}
        <div>
          <Link
            to={data?.socialLinks?.github}
            className="flex items-center gap-2"
          >
            <i className="fa-brands fa-github" />
            <p className="mb-1">{data?.socialLinks?.github}</p>
          </Link>
        </div>

        {/* for linkedin */}
        <div>
          <Link
            to={data?.socialLinks?.linkedin}
            className="flex items-center gap-2"
          >
            <i className="fa-brands fa-linkedin" />
            <p className="mb-1">{data?.socialLinks?.linkedin}</p>
          </Link>
        </div>

        {/* for portfolio website */}
        {data?.socialLinks?.portfolio && (
          <div>
            <Link
              to={data?.socialLinks?.portfolio}
              className="flex items-center gap-2"
            >
              <i className="fa-solid fa-globe" />
              <p className="mb-1">{data?.socialLinks?.portfolio}</p>
            </Link>
          </div>
        )}

        {/* for location */}
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-location-crosshairs" />
          <p className="mb-1">
            {data?.personalDetails?.city} ({data?.personalDetails?.state})
          </p>
        </div>
      </section>

      {/* main section */}
      <main className="grid grid-cols-2 p-5 gap-x-5 gap-y-2">
        {/* for left side */}
        <section className="space-y-5">
          {/* for educational details */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Education</h1>
            <ul className="space-y-2">
              {/* for post graduation */}
              {data?.educationalDetails?.postGraduation?.name && (
                <li>
                  <h3 className="text-lg font-bold">Post Graduation</h3>
                  <p className="text-xl font-semibold">
                    {data?.educationalDetails?.postGraduation?.name}
                  </p>
                  <p className="text-xs font-semibold text-gray-700">
                    {String(
                      data?.educationalDetails?.postGraduation?.startDate,
                    )}{" "}
                    to{" "}
                    {String(data?.educationalDetails?.postGraduation?.endDate)}
                  </p>
                </li>
              )}

              {/* for graduation */}
              {data?.educationalDetails?.graduation?.name && (
                <li>
                  <h3 className="text-lg font-bold">Graduation</h3>
                  <p className="text-xl font-semibold">
                    {data?.educationalDetails?.graduation?.name}
                  </p>
                  <p className="text-xs font-semibold text-gray-700">
                    {String(data?.educationalDetails?.graduation?.startDate)} to{" "}
                    {String(data?.educationalDetails?.graduation?.endDate)}
                  </p>
                </li>
              )}

              {/* for intermediate */}
              {data?.educationalDetails?.intermediate?.name && (
                <li>
                  <h3 className="text-lg font-bold">Intermediate</h3>
                  <p className="text-xl font-semibold">
                    {data?.educationalDetails?.intermediate?.name}
                  </p>
                  <p className="text-xs font-semibold text-gray-700">
                    {String(data?.educationalDetails?.intermediate?.startDate)}{" "}
                    to {String(data?.educationalDetails?.intermediate?.endDate)}
                  </p>
                </li>
              )}

              {/* for high school */}
              {data?.educationalDetails?.highSchool?.name && (
                <li>
                  <h3 className="text-lg font-bold">High School</h3>
                  <p className="text-xl font-semibold">
                    {data?.educationalDetails?.highSchool?.name}
                  </p>
                  <p className="text-xs font-semibold text-gray-700">
                    {String(data?.educationalDetails?.highSchool?.startDate)} to{" "}
                    {String(data?.educationalDetails?.highSchool?.endDate)}
                  </p>
                </li>
              )}
            </ul>
          </div>

          {/* for experience */}
          {data?.workExperience?.hasExperience && (
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Work Experience</h1>
              <ul className="space-y-2">
                {(data?.workExperience?.workExperience ?? []).map(
                  (work: IworkExperience) => {
                    return (
                      <li key={nanoid()}>
                        <h1 className="text-xl font-bold">
                          {work?.designation}
                        </h1>
                        <h3 className="text-2xl font-semibold">
                          {work?.companyName}
                        </h3>
                        <p className="text-xs font-semibold text-gray-700">
                          {String(work?.startDuration)} to{" "}
                          {String(work?.endDuration)}
                        </p>
                        <ul className="pl-5 list-disc text-md">
                          {work?.workDone.map((task: string) => {
                            return <li key={nanoid()}>{task}</li>;
                          })}
                        </ul>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          )}

          {/* for projects */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Projects</h1>
            <ul className="space-y-2">
              {(Array.isArray(data?.projects) ? data?.projects ?? [] : []).map(
                (project: Iproject) => {
                  return (
                    <li key={nanoid()}>
                      <h1 className="text-xl font-semibold">
                        {project?.projectName}
                      </h1>
                      <p>{project?.projectDescription}</p>
                      <ul className="flex flex-wrap items-center gap-2 mt-1">
                        {project?.projectTechnology?.map((tech: string) => {
                          return (
                            <li
                              key={nanoid()}
                              className={`flex items-center justify-center px-3 py-1 text-sm text-white bg-gray-500 rounded-md ${
                                templateColor === "gray"
                                  ? "bg-gray-700"
                                  : templateColor === "teal"
                                  ? "bg-teal-700"
                                  : "bg-cyan-700"
                              } `}
                            >
                              {tech}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        </section>

        {/* for right side */}
        <section className="space-y-5">
          {/* for skills */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Skills</h1>
            <ul className="flex flex-wrap items-center gap-2">
              {data?.personalDetails?.skills?.map((skill) => {
                return (
                  <li
                    key={nanoid()}
                    className={`px-3 py-1 text-sm text-white bg-gray-500 rounded-md ${
                      templateColor === "gray"
                        ? "bg-gray-700"
                        : templateColor === "teal"
                        ? "bg-teal-700"
                        : "bg-cyan-700"
                    } `}
                  >
                    {skill?.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* for certificates */}
          {data?.certificate?.hasCertificate && (
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Certifications</h1>
              <ul>
                {data?.certificate?.certificates?.map(
                  (certificate: Icertificate) => {
                    return (
                      <li key={nanoid()}>
                        <h1 className="text-lg font-semibold">
                          {certificate?.certificateName}
                        </h1>
                        <p>{certificate?.certificateLink}</p>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          )}

          {/* for language preferences */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Languages</h1>
            <ul className="flex flex-wrap items-center gap-2">
              {(Array.isArray(data?.personalDetails?.languages)
                ? data?.personalDetails?.languages ?? []
                : []
              ).map((lang: { language: string }) => {
                return (
                  <li
                    key={nanoid()}
                    className={`px-3 py-1 text-sm text-white rounded-md ${
                      templateColor === "gray"
                        ? "bg-gray-700"
                        : templateColor === "teal"
                        ? "bg-teal-700"
                        : "bg-cyan-700"
                    } `}
                  >
                    {lang.language}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* for interest */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Interest</h1>
            <ul className="flex flex-wrap items-center gap-2">
              {(Array.isArray(data?.personalDetails?.interests)
                ? data?.personalDetails?.interests ?? []
                : []
              ).map((interest: { hobby: string }) => {
                return (
                  <li
                    key={nanoid()}
                    className={`px-3 py-1 text-sm text-white rounded-md ${
                      templateColor === "gray"
                        ? "bg-gray-700"
                        : templateColor === "teal"
                        ? "bg-teal-700"
                        : "bg-cyan-700"
                    } `}
                  >
                    {interest?.hobby}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Template1;
