import React from 'react'
import './Sidebar.css'
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
        <a href='#' className='item'>
          <FaTasks className='icon'/>
          Task-Group
        </a>
      

      
        <a href='#' className='item'>
          <BiMailSend className='icon'/>
          Mail-Sender
        </a>

        <a href='#' className='item'>
          <MdOutlineTranslate className='icon'/>
          Translate
        </a>

        <a href='#' className='item'>
          <RiAdvertisementLine className='icon' />
          Advertisement
        </a>
    

      
        <a href='#' className='item'>
          <MdOutlineCreate className='icon'/>
          AI-Creater
        </a>
     

     
        <a href='#' className='item'>
          <FaHistory className='icon'/>
          History
        </a>
     

      
        <a href='#' className='item'>
          <BiExport className='icon'/>
          Export
        </a>
    

      
        <a href='#' className='item'>
          <MdOutlineLogout className='icon'/>
          Logout
        </a>
      
      </div>
    </div>

  </div>
  )
}
export default Sidebar