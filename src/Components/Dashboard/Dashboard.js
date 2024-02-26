import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import Content from "./Content/Content";
import Profile from "./Content/Profile";
import Tinymce from "../Tinymce/Tinymce";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard--content">
          <Tinymce />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
