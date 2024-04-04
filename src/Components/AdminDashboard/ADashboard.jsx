import React from 'react'
import './ADashboard.css'
import ASidebar from './ASidebar/ASidebar';
import { Outlet } from "react-router-dom";
const ADashboard = () => {
  return (
<>
   <div className='admin-dashboard'>
      <ASidebar />
      <div className="admin-dashboard-content">
        <Outlet/>
      </div>
    </div>
</>
  )
}
export default ADashboard