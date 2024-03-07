import React from "react";
import "./Profile.css";
import Image from "./2.jpg";
import ProfileHeader from "./ProfileHeader";
import { BiBook } from "react-icons/bi";

const courses = [
  {
    title: "HTML & CSS",
    duration: "2-Hours",
    icon: <BiBook />,
  },
  {
    title: "Javascript",
    duration: "2-Hours",
    icon: <BiBook />,
  },
  {
    title: "React.js",
    duration: "2-Hours",
    icon: <BiBook />,
  },
];

const Profile = () => {
  return (
    <>
      <div className="profile">
        <ProfileHeader />

        <div className="user--profile">
          <div className="user--detail">
            <img src={Image} alt="" />
            <h3 className="username">Jhone Doe</h3>
            <span className="profession">Teacher</span>
          </div>

          <div classname="user-courses">
            {courses.map((courses) => (
              <div className="course">
                <div className="course-detail">
                  <div className="course-cover">{courses.icon}</div>
                  <div className="course-name">
                    <h5 className="title">{courses.title}</h5>
                    <span className="duration">{courses.duration}</span>
                  </div>
                </div>
                <div className="action">:</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
