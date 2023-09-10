import React from "react";
import { Link } from "react-router-dom";
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
  console.log(data?.personalDetails?.interests);
  return (
    <div>
      {/* creating the resume header */}
      <header>
        <h1>{data?.personalDetails?.fullName}</h1>
        <h4>{data?.personalDetails?.role}</h4>
        <p>{data?.personalDetails?.bio}</p>
      </header>

      {/* for social links */}
      <section>
        {/* for email */}
        <div>
          <Link to={data?.socialLinks?.email}>
            <i className="fa-solid fa-envelope" />
            <p>{data?.socialLinks?.email}</p>
          </Link>
        </div>

        {/* for phone number */}
        <div>
          <i className="fa-solid fa-phone" />
          <p>{data?.socialLinks?.phoneNumber}</p>
        </div>

        {/* github */}
        <div>
          <Link to={data?.socialLinks?.github}>
            <i className="fa-brands fa-github" />
            <p>{data?.socialLinks?.github}</p>
          </Link>
        </div>

        {/* for linkedin */}
        <div>
          <Link to={data?.socialLinks?.linkedin}>
            <i className="fa-brands fa-linkedin" />
            <p>{data?.socialLinks?.linkedin}</p>
          </Link>
        </div>

        {/* for portfolio website */}
        {data?.socialLinks?.portfolio && (
          <div>
            <Link to={data?.socialLinks?.portfolio}>
              <i className="fa-solid fa-globe" />
              <p>{data?.socialLinks?.portfolio}</p>
            </Link>
          </div>
        )}

        {/* for location */}
        <div>
          <i className="fa-solid fa-location-crosshairs" />
          <p>
            {data?.personalDetails?.city} ({data?.personalDetails?.state})
          </p>
        </div>
      </section>

      {/* main section */}
      <main>
        {/* for left side */}
        <section>
          {/* for educational details */}
          <div>
            <h1>Education</h1>
            <ul>
              {/* for post graduation */}
              {data?.educationalDetails?.postGraduation?.name && (
                <li>
                  <h3>Post Graduation</h3>
                  <p>{data?.educationalDetails?.postGraduation?.name}</p>
                  <p>
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
                  <h3>Graduation</h3>
                  <p>{data?.educationalDetails?.graduation?.name}</p>
                  <p>
                    {String(data?.educationalDetails?.graduation?.startDate)} to{" "}
                    {String(data?.educationalDetails?.graduation?.endDate)}
                  </p>
                </li>
              )}

              {/* for intermediate */}
              {data?.educationalDetails?.intermediate?.name && (
                <li>
                  <h3>Intermediate</h3>
                  <p>{data?.educationalDetails?.intermediate?.name}</p>
                  <p>
                    {String(data?.educationalDetails?.intermediate?.startDate)}{" "}
                    to {String(data?.educationalDetails?.intermediate?.endDate)}
                  </p>
                </li>
              )}

              {/* for high school */}
              {data?.educationalDetails?.highSchool?.name && (
                <li>
                  <h3>High School</h3>
                  <p>{data?.educationalDetails?.highSchool?.name}</p>
                  <p>
                    {String(data?.educationalDetails?.highSchool?.startDate)} to{" "}
                    {String(data?.educationalDetails?.highSchool?.endDate)}
                  </p>
                </li>
              )}
            </ul>
          </div>

          {/* for experience */}
          {data?.workExperience?.hasExperience && (
            <div>
              <h1>Work Experience</h1>
              <ul>
                {(data?.workExperience?.workExperience ?? []).map(
                  (work: IworkExperience) => {
                    return (
                      <li key={Date.now()}>
                        <h1>{work?.companyName}</h1>
                        <div>
                          <h5>{work?.designation}</h5>
                          <p>
                            {String(work?.startDuration)} to{" "}
                            {String(work?.endDuration)}
                          </p>
                        </div>
                        <ul>
                          {work?.workDone.map((task: string) => {
                            return <li key={Date.now()}>{task}</li>;
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
          <div>
            <h1>Projects</h1>
            <ul>
              {(Array.isArray(data?.projects) ? data?.projects ?? [] : []).map(
                (project: Iproject) => {
                  return (
                    <li key={Date.now()}>
                      <h1>{project?.projectName}</h1>
                      <p>{project?.projectDescription}</p>
                      <ul>
                        {project?.projectTechnology?.map((tech: string) => {
                          return <li key={Date.now()}>{tech}</li>;
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
        <section>
          {/* for skills */}
          <div>
            <h1>Skills</h1>
            <ul>
              {data?.personalDetails?.skills?.map((skill) => {
                return <li key={Date.now()}>{skill?.name}</li>;
              })}
            </ul>
          </div>

          {/* for certificates */}
          {data?.certificate?.hasCertificate && (
            <div>
              <h1>Certifications</h1>
              <ul>
                {data?.certificate?.certificates?.map(
                  (certificate: Icertificate) => {
                    return (
                      <li key={Date.now()}>
                        <h1>{certificate?.certificateName}</h1>
                        <p>{certificate?.certificateLink}</p>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          )}

          {/* for language preferences */}
          <div>
            <h1>Languages</h1>
            <ul>
              {(Array.isArray(data?.personalDetails?.languages)
                ? data?.personalDetails?.languages ?? []
                : []
              ).map((lang: { language: string }) => {
                return <p key={Date.now()}>{lang.language}</p>;
              })}
            </ul>
          </div>

          {/* for interest */}
          <div>
            <h1>Interest</h1>
            <ul>
              {(Array.isArray(data?.personalDetails?.interests)
                ? data?.personalDetails?.interests ?? []
                : []
              ).map((interest: { hobby: string }) => {
                return <p key={Date.now()}>{interest?.hobby}</p>;
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Template1;
