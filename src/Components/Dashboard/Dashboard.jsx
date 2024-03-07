import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard--content">
          <nav className="nav">Nothing</nav>
          <Outlet/>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
