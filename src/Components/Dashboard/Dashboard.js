import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import './Dashboard.css'
import Content from './Content/Content';
import Profile from './Content/Profile';
 const Dashboard = () => {
  return (
<>
   <div className='dashboard'>
      <Sidebar />
    
    <div className='dashboard--content'>
      <Content />
      <Profile />
    </div>
    </div>
</>
  )
}
export default Dashboard