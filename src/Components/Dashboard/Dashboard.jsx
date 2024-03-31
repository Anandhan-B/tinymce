import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import { Outlet, useOutletContext } from "react-router-dom";
const Dashboard = () => {
  const userData = useOutletContext()
  return (
    <>
      <div className="dashboard">
        <Sidebar data={userData} />

        <div className="dashboard--content">
          <nav className="nav"><h2><span>{userData.email.split("@")[0]}  </span><br/> </h2></nav>
          <div className="dashboard-outlet"><Outlet/></div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
