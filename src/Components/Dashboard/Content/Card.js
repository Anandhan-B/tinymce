import React from "react";
import { BiLogoHtml5, BiLogoAndroid, BiBuilding } from "react-icons/bi";

const course = [
  {
    title: "Web Development",
    icon: <BiLogoHtml5 />,
  },
  {
    title: "App Development",
    duration: "2-Hours",
    icon: <BiLogoAndroid />,
  },
  {
    title: "UX & UI",
    duration: "2-Hours",
    icon: <BiBuilding />,
  },
];

const Card = () => {
  return (
    <div className="card--container">
      {course.map((item) => (
        <div className="card">
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
