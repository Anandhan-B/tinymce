import React, { useState, useEffect } from 'react';
import './Otp.css'
import { Typography, Button } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [resendTime, setResendTime] = useState(60); 

  const handleChange = (newValue) => {
    // Check if newValue is numeric before updating the state
    if (!isNaN(newValue) && Number.isInteger(Number(newValue))) {
      setOtp(newValue);
    }
  };

  const handleResend = () => {
    // You can place logic here to resend the OTP via email or any other method
    // For now, let's just reset the timer
    setResendTime(60);
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

  return (
    <div id='otp-body'>
      <div id='otp'>
        <Typography variant='h4'>Verify</Typography>

        <Typography variant='h5'>
          Your code was sent to your via email
        </Typography>

        <MuiOtpInput
          id='otp-input'
          value={otp}
          length={6}
          numInputs={4}
          onChange={handleChange}
        />

        <Button
          variant='contained'
          color='primary'
          /* onClick={handleSignUp} */
        >
          Verify
        </Button>

        {resendTime === 0 && (
          <Button
            variant='outlined'
            color='primary'
            onClick={handleResend}
          >
            Resend OTP
          </Button>
        )}

        {resendTime !== 0 && (
          <Typography variant='body2'>
            Resend OTP in {resendTime} seconds
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Otp;
