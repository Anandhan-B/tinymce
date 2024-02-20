import React, { useState } from 'react';
import Swal from 'sweetalert2';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import './Forget.css'
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';


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

    setMessage(`Password reset link sent to ${email}`);
  
    setEmail(''); 
    window.location.href = '/otp';
  };

  return (
    <div id='forget-body'>
       <div id='forget'>
        
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