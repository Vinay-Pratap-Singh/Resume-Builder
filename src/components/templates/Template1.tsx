import React from "react";
import { Link } from "react-router-dom";
import { IpreviewData } from "../../helper/interface";

interface Iprops {
  data: IpreviewData;
}

const Template1 = ({ data }: Iprops) => {
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
        {/* for work experience */}

        {/* skills section */}
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
