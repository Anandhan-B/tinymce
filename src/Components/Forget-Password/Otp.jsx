import React, { useState, useEffect } from 'react';
import './Otp.css'
import { Typography, Button } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { styled } from '@mui/system';
import  axios from 'axios';
import swal from 'sweetalert2'



const MyMuiOtpInput = styled(MuiOtpInput)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
    '&.Mui-focused .MuiInputLabel-root': {
      color: '#27374d', // Focused label color
    },
  },
}));





const Otp = () => {
  const [otp, setOtp] = useState('');
  const [resendTime, setResendTime] = useState(60); 

  const handleChange = (newValue) => {
    // Check if newValue is numeric before updating the state
    if (!isNaN(newValue) && Number.isInteger(Number(newValue))) {
      setOtp(newValue);
    }
  };

  const handleResend = async() => {
    const email = localStorage.getItem("resetEmail")
    if(!email) return swal.fire({
      title: "Error",
      text: "Try again later",
      icon: "error",
    });
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/reset-password",
        {
          email
        }
      );
     
      swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
      });
      
      setResendTime(60);
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

  useEffect(() => {
    const timer =
      resendTime > 0 &&
      setInterval(() => setResendTime((prevTime) => prevTime - 1), 1000);

    // If resendTime reaches 0, clear the interval
    if (resendTime === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [resendTime]);

  const handleOtp  = async()=>{
    const email = localStorage.getItem("resetEmail")
    if(!email) return swal.fire({
      title: "Error",
      text: "Try again later",
      icon: "error",
    });
    if (!otp) return swal.fire('Error!', 'Fill the OTP field', 'error');

    try {
      const response = await axios.post(
        `http://localhost:7000/api/v1/user/reset-password/${otp}`,{email}
      );
      localStorage.setItem("resetToken",response.data.resetToken)
      swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
        timer: 3000,
      });
      
      localStorage.removeItem("resetEmail")
      window.location.href = '/reset';
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
    <div id='otp-body'>
      <div id='otp'>
        <p className='otp-head' variant='h4'>Verify</p>

        <Typography className='otp-content'  variant='h5'>
          Your code was sent to your via email
        </Typography>

        <MyMuiOtpInput
          id='otp-input'
          value={otp}
          length={4}
          numInputs={4}
          onChange={handleChange}



        />

        <Button
        className='otp-verify'
          variant='contained'
          type='submit'
         onClick={handleOtp} 
        >
          Verify
        </Button>

        {resendTime === 0 && (
          <Button
            variant='outlined'
            className='otp-resend'
            onClick={handleResend}
          >
            Resend OTP
          </Button>
        )}

        {resendTime !== 0 && (
          <Typography className='otp-resendtime' variant='body2'>
            Resend OTP in {resendTime} seconds
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Otp;
