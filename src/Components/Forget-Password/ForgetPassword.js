import React, { useState } from 'react';
import Swal from 'sweetalert2';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import './Forget.css'
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import swal from 'sweetalert2';
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




const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      Swal.fire('Error!', 'Fill the Email field', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire('Error!', 'Invalid email format', 'error');
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/reset-password",
        {
          email
        }
      );
     
      swal.fire({
        title: "Success",
        text: response.data,
        icon: "success",
        timer: 3000,
      });
      
      setEmail('');
      localStorage.setItem("resetEmail",email) 
      window.location.href = '/otp';
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
   
  };

  return (
    <div id='forget-body'>
       <div id='forget'>
    <div className='for-t-t'>   
      <Typography id="title" variant="h5"  gutterBottom>
        Enter your email to get OTP
      </Typography>

      <MyTextField
        variant="outlined"
        required
        autoComplete="off"
        id="for-email"
        label="Email Address"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <EmailOutlinedIcon style={{ marginRight: "8px" }} id="lock" />
          ),
        }}
        />
</div> 
      <Button id='for-btn' type="submit" variant="contained" onClick={handleSubmit}>
        Submit
      </Button>

      {message && (

        <Typography variant="body1" align="center">
          {message}
        </Typography>

      )}

    </div>
    </div>
  );
};

export default ForgetPassword;