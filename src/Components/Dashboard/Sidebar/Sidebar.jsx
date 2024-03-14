import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import {BiExport, BiMailSend} from 'react-icons/bi'
import {FaHistory, FaTasks} from 'react-icons/fa'
import {RiAdvertisementLine} from 'react-icons/ri'
import {MdOutlineCreate, MdOutlineTranslate, MdOutlineDashboard, MdOutlineLogout, MdTranslate} from 'react-icons/md'



const Sidebar = (props) => {
  console.log("data :  ",props)
  return (
    <div className='body'>
      <div className='menu '>
        <div className='sidebar-logo active'>
            <MdOutlineDashboard className='logo-icon' />
            <h2>{/* <span>{props.data.email.split("@")[0] +"'s "}</span><br/> */} Dashboard</h2>
        </div>
      

{/* Sidebar--Start */}

      <div className='menu--list'> 
        <NavLink to='task-group' className='item'>
          <FaTasks className='sidebar-icon'/>
          Task-Group
        </NavLink>
      
        <NavLink to='' className='item' end>
          <BiMailSend className='sidebar-icon'/>
          Mail-Sender
        </NavLink>

        <NavLink to='translate' className='item'>
          <MdOutlineTranslate className='sidebar-icon'/>
          Translate
        </NavLink>

        <NavLink to='advertisement' className='item'>
          <RiAdvertisementLine className='sidebar-icon' />
          Advertisement
        </NavLink>
    

      
        <NavLink to='ai-creator' className='item'>
          <MdOutlineCreate className='sidebar-icon'/>
          AI-Creater
        </NavLink>
     

     
        <NavLink to='history' className='item'>
          <FaHistory className='sidebar-icon'/>
          History
        </NavLink>
     

      
        <NavLink to='export' className='item'>
          <BiExport className='sidebar-icon'/>
          Export
        </NavLink>
    

      
        <NavLink to='/' onClick={()=>{
              localStorage.removeItem("bulkmailusertoken")
        }} className='item'>
          <MdOutlineLogout className='sidebar-icon'/>
          Logout
        </NavLink>
      
      </div>
    </div>

  </div>
  )
}
export default Sidebar