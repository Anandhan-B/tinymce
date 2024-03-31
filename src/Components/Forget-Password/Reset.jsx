import { Button, TextField, Typography, DialogTitle } from '@mui/material'
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import React from 'react'
import './Reset.css'
import { useState } from 'react'
import swal from 'sweetalert2'
import { styled } from '@mui/system';
import axios from 'axios';
import WhiteLoader from '../WhiteLoader/WhiteLoader'
import KeyIcon from '../../Assets/gold-key.png'
import PasswordGenerator from '../PasswordGenerator/PasswordGenerator';

const MyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
    '&.Mui-focused .MuiInputLabel-root': {
      color: '#27374d', // Focused label color
    },
  },
}));



function Reset() {
  const [password, setPassword] = useState()
  const [confirmpassword, setConfirmpassword] = useState()
  const [loading, setLoading] = useState(false)
  const [modal,setModal] = useState(false)
  const resetPass = async () => {

    if (!password || !confirmpassword) {
      swal.fire('Error', 'Please enter all the fields', 'error')
      return
    }

    if(password.length < 6){
      swal.fire('Error','Password must in 6 Characters','error')
      return
    }


    if(password !== confirmpassword){
      swal.fire('Error','Password does not match','error')
      return
    }
    const token = localStorage.getItem("resetToken")
    if(!token) return swal.fire('Error','Session Expired, try again later','error')
    try {
    setLoading(true)
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/new-password",{password},{
        headers: {
          'Authorization': `Bearer ${token}`
        }}
      );
     setLoading(false)
      swal.fire({
        title: "Success",
        text: response.data,
        icon: "success",
        timer: 3000,
      });
      localStorage.removeItem("resetToken")
      window.location.href = '/';
    } catch (error) {
      setLoading(false)
      if (error.response.status) {
        swal.fire({
          title: error.response.statusText,
          text: error.response.data,
          icon: "error",
        });
      } else {
        swal.fire({ title: "Error", text: error.message, icon: "error" });
      }
    }

  }
  return (
    <div id='reset-body'>
      <div id='reset'>
      <span><Button sx={{position:"absolute",right:'40px',top:'40px',overflow:'hidden'}} variant="outlined" onClick={() => setModal(true)}>
        <img className="psw-icon" src={KeyIcon} width="40px" height="40px" />&nbsp;
        Password Generator <div className="shine-effect"></div>
      </Button></span>
        <p className='reset-head'>Reset your Password</p>
        <MyTextField
          id='new-pass'
          label='New-Password'
          variant='outlined'
          type='password'
          onChange={(e) => setPassword(e.target.value)} />

        <MyTextField
          id='con-pass'
          label='Confirm-Password'
          variant='outlined'
          type='password'
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <Button className='btn-reset' variant='contained' onClick={resetPass} >{ loading ? <WhiteLoader/> : "Change Password"}</Button>
      </div>
      <Modal
       aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modal}
        onClose={() => setModal(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog size="sm" sx={{
          padding:'0',
          margin:'0',
          background:"white",
          color:'#27374d'
        }}
        >
          {/* <ModalClose variant="plain" sx={{ m: 1 }} /> */}
          <DialogTitle sx={{
          padding:'10px 20px'        }}
          >
            Create Strong Password
          </DialogTitle>
          <PasswordGenerator/>
          
        </ModalDialog>
      </Modal> 
    </div>
  )
}
export default Reset