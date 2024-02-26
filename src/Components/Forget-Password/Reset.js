import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import './Reset.css'
import { useState } from 'react'
import swal from 'sweetalert2'
import { styled } from '@mui/system';
import axios from 'axios';

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
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/new-password",{password},{
        headers: {
          'Authorization': `Bearer ${token}`
        }}
      );
     
      swal.fire({
        title: "Success",
        text: response.data,
        icon: "success",
        timer: 3000,
      });
      
      window.location.href = '/login';
    } catch (error) {
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
        <p className='reset-head'>Reset your Password</p>
        <MyTextField
          id='new-pass'
          label='New-Password'
          variant='outlined'
          onChange={(e) => setPassword(e.target.value)} />

        <MyTextField
          id='con-pass'
          label='Confirm-Password'
          variant='outlined'
          type='password'
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <Button className='btn-reset' variant='contained' onClick={resetPass} >Change Password</Button>
      </div>
    </div>
  )
}
export default Reset