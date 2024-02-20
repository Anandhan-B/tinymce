import React from 'react'
import './ASidebar.css'
import {MdOutlineAdminPanelSettings} from 'react-icons/md'
import { RiShieldUserLine } from 'react-icons/ri'



const ASidebar = () => {
  return (
    <div className='body'>

      <div className='menu'>
        <div className='logo'>
            <MdOutlineAdminPanelSettings className='logo-icon' />
            <h2>Admin-Dashboard</h2>
        </div>
      

{/* Sidebar--Start */}

      <div className='menu--list'>
        <a href='#' className='item'>
          <RiShieldUserLine className='icon'/>
          User-Management
        </a>
      </div>
    </div>

  </div>
  )
}
export default ASidebar