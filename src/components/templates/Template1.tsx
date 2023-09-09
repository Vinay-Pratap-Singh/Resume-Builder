import React from "react";
import { Link } from "react-router-dom";
import { IpreviewData } from "../../helper/interface";

interface Iprops {
  data: IpreviewData;
}

const Template1 = ({ data }: Iprops) => {
  console.log(typeof data?.workExperience?.workExperience);
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
        {/* github */}
        <Link to={data?.socialLinks?.github}>
          <i className="fa-brands fa-github" />
        </Link>
        {/* for linkedin */}
        <Link to={data?.socialLinks?.linkedin}>
          <i className="fa-brands fa-linkedin" />
        </Link>
        {/* for email */}
        <Link to={data?.socialLinks?.email}>
          <i className="fa-solid fa-envelope" />
        </Link>
        {/* for portfolio website */}
        {data?.socialLinks?.portfolio && (
          <Link to={data?.socialLinks?.portfolio}>
            <i className="fa-solid fa-globe" />
          </Link>
        )}
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
          <div>
            <h1>Work Experience</h1>
          </div>
        </section>

        {/* for right side */}
        <section>
          {data?.personalDetails?.skills?.map((skill) => {
            return <div key={Date.now()}>{skill?.name}</div>;
          })}
        </section>
      </main>
    </div>
  );
};

export default Template1;
