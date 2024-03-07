import React from "react";
import "./TeacherList.css";
import Image from "./2.jpg";
const teachers = [
  {
    image: Image,
    name: "prof.jhone Doe",
    duration: "20 hours lesson",
    cost: "100",
  },
  {
    image: Image,
    name: "prof.jhone Doe",
    duration: "20 hours lesson",
    cost: "100",
  },
  {
    image: Image,
    name: "prof.jhone Doe",
    duration: "20 hours lesson",
    cost: "100",
  },
  {
    image: Image,
    name: "prof.jhone Doe",
    duration: "20 hours lesson",
    cost: "100",
  },
];
const TeacherList = () => {
  return (
    <div className="teacher--list">
      <div className="list--header">
        <h2>Teachers</h2>
        <select>
          <option value="english">English</option>
          <option value="tamil">Tamil</option>
        </select>
      </div>
      <div className="list--container">
        {teachers.map((teachers) => (
          <div className="list">
            <div className="teacher--detail">
              <img src={teachers.image} alt={teachers.name} />
              <h2>{teachers.name}</h2>
            </div>
            <span>{teachers.duration}</span>
            <span>${teachers.cost}/hr.</span>
            <span className="teacher--todo">:</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TeacherList;
