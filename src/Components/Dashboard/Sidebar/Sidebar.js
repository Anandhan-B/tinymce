import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import {BiExport, BiMailSend} from 'react-icons/bi'
import {FaHistory, FaTasks} from 'react-icons/fa'
import {RiAdvertisementLine} from 'react-icons/ri'
import {MdOutlineCreate, MdOutlineTranslate, MdOutlineDashboard, MdOutlineLogout, MdTranslate} from 'react-icons/md'



const Sidebar = () => {
  return (
    <div className='body'>

      <div className='menu '>
        <div className='logo active'>
            <MdOutlineDashboard className='logo-icon' />
            <h2>Dashboard</h2>
        </div>
      

{/* Sidebar--Start */}

      <div className='menu--list'> 
        <NavLink to='task-group' className='item'>
          <FaTasks className='icon'/>
          Task-Group
        </NavLink>
      

      
        <NavLink to='' className='item' end>
          <BiMailSend className='icon'/>
          Mail-Sender
        </NavLink>

        <NavLink to='translate' className='item'>
          <MdOutlineTranslate className='icon'/>
          Translate
        </NavLink>

        <NavLink to='advertisement' className='item'>
          <RiAdvertisementLine className='icon' />
          Advertisement
        </NavLink>
    

      
        <NavLink to='ai-creator' className='item'>
          <MdOutlineCreate className='icon'/>
          AI-Creater
        </NavLink>
     

     
        <NavLink to='history' className='item'>
          <FaHistory className='icon'/>
          History
        </NavLink>
     

      
        <NavLink to='export' className='item'>
          <BiExport className='icon'/>
          Export
        </NavLink>
    

      
        <NavLink to='/' onClick={()=>{
              localStorage.removeItem("bulkmailusertoken")
        }} className='item'>
          <MdOutlineLogout className='icon'/>
          Logout
        </NavLink>
      
      </div>
    </div>

  </div>
  )
}
export default Sidebar