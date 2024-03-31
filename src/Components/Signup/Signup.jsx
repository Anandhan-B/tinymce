import React from "react";
import "../Signup/Signup.css";
import { Button, TextField, Typography, DialogTitle } from "@mui/material";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import {  useState } from "react";
import axios from "axios";
import swal from 'sweetalert2';
import { styled } from '@mui/system';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import WhiteLoader from '../WhiteLoader/WhiteLoader'
import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";
import KeyIcon from '../../Assets/gold-key.png'

const MyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
  },
}));

const Signup = () => {
  
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  const [isDisabled,setIsDisabled]=useState(true);
  const [confirmPassword,setConfirmPassword]=useState(null);
  const [loading,setLoading]=useState(false);
  const [modal,setModal] = useState(false)

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

  const createUser = async(e) => {
    e.preventDefault()
    if(email && password && confirmPassword){
      if(!validateEmail(email)) return swal.fire({
        title: "Error",
        text: "Email not Valid",
        icon: "error",
      });
      if(password !== confirmPassword) return  swal.fire({
        title: "Error",
        text: "Passwords did't match",
        icon: "error",
      });
      if(password.length < 6) return  swal.fire({
        title: "Error",
        text: "Password length must be at least 6 characters",
        icon: "error",
      });
      try {
        setLoading(true)
        const response = await axios.post(
          "http://localhost:7000/api/v1/user/signup",
          {
            email,
            password,
          }
        );
       
        swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          timer: 3000,
        });
        localStorage.setItem("bulkmailusertoken", response.data.token);
        window.location.href = '/dashboard'

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
    else{
      swal.fire({
        title: "Error",
        text: "Enter all Fields",
        icon: "error",
      });
    }
  }

const handleVerificationSuccess = (token)=>{
  setIsDisabled(false)
}

  return (
    <>
      <form id="body" onSubmit={createUser}>
        <Typography>
          <h2 id="h2-sign">Signup</h2>
          <div id="underline"></div>
        </Typography>
        <MyTextField
          id="mail-log"
          label="Email"
          type="email"
          required
          onChange={(e)=>setEmail(e.target.value)}

          // inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
          InputProps={{
            startAdornment: (
              <EmailOutlinedIcon style={{ marginRight: "8px" }} id="lock" />
            ),
          }}
        />

<span><Button sx={{position:"absolute",right:'40px',top:'40px',overflow:'hidden'}} variant="outlined" onClick={() => setModal(true)}>
        <img className="psw-icon" src={KeyIcon} width="40px" height="40px" />&nbsp;
        Password Generator <div className="shine-effect"></div>
      </Button></span>
        <MyTextField
          id="pass-log"
          label="Password"
          type="password"
          required
          onChange={(e)=>setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <LockOutlinedIcon style={{ marginRight: "8px" }} id="lock" />
            ),
          }}
          

        />

        <MyTextField
          id="conpass-log"
          label="Confirm Password"
          type="password"
          required
          onChange={(e)=>setConfirmPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <LockOutlinedIcon style={{ marginRight: "8px" }} id="lock" />
            ),
          }}
        />
        <HCaptcha
      sitekey="0d796079-84ba-44a0-8b50-7fd090f48d7c"
       onVerify={handleVerificationSuccess}
    />
        <Button id="btn-signin" type="submit" disabled={isDisabled} variant="contained">
          {loading ? <WhiteLoader/> : "Signup"}
        </Button>
        <div id="aup-log">
          <label id="al-sign">Already have an account?</label>
          <Link id="sign-log" to="/">
            &nbsp; Login
          </Link>
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
   
      </form>
    </>
  );
};

export default Signup;
