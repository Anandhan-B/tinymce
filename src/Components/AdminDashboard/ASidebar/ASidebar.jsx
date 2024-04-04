import React from 'react'
import './ASidebar.css'
import {MdOutlineAdminPanelSettings , MdOutlineLogout} from 'react-icons/md'
import { RiShieldUserLine } from 'react-icons/ri'
import {NavLink } from 'react-router-dom'



const ASidebar = () => {
  return (
    <div className='body'>

      <div className='menu'>
        <div className='logo'>
            <MdOutlineAdminPanelSettings className='logo-icon' />
            <h2>Admin Dashboard</h2>
        </div>
      

{/* Sidebar--Start */}

        <div className='admin-menu-list'>
          <NavLink to='' className='admin-menu-item' end>
            <RiShieldUserLine className='icon'/>
            User-Management
          </NavLink>
        
          <NavLink end to='/admin' onClick={()=> localStorage.removeItem("bulkmailadmintoken")} className='admin-menu-item'>
           <MdOutlineLogout className='icon'/> 
            Logout
          </NavLink>
        </div>

      </div>
    </div>
  )
}
export default ASidebar