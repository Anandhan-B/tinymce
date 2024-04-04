import React from 'react'
import './AdminLogin.css'
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
  } from "@mui/material";
  import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  import { Link, Navigate, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import axios from "axios";
  import swal from "sweetalert2";
  import { styled } from '@mui/system';
  import WhiteLoader from "../WhiteLoader/WhiteLoader";
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
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
  
const AdminLogin = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const loginAdmin = async (e) => {
    e.preventDefault()
    if (!(email && password))
      return swal.fire({
        title: "Error",
        text: "Enter all Fields",
        icon: "error",
      });
    if (!validateEmail(email))
      return swal.fire({
        title: "Error",
        text: "Enter valid email",
        icon: "error",
      });
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:7000/api/v1/admin/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("bulkmailadmintoken", response.data.token);
      swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
        timer: 3000,
      });
      navigate('/admin/dashboard')
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.status) {
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
    <>
      <form id="body" onSubmit={loginAdmin}>
        <Typography>
          <h2 id="h2-log-ad">Admin Login </h2>
          <div id="underline"></div>
        </Typography>
        <MyTextField
          id="mail-log"
          label="Email"
          type="email "
          autocomplete="off"
          required
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <EmailOutlinedIcon style={{ marginRight: "8px" }} id="lock" />
            ),
          }}

          />

        <MyTextField
          id="pass-log"
          label="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <LockOutlinedIcon style={{ marginRight: "8px" }} id="lock" />
            ),
          }}
        />
        <div id="log-rc-flex">
          <FormGroup>
            <FormControlLabel
              id="chk-log"
              control={<Checkbox  size="xx-small"
        {...label}
        defaultChecked
        sx={{
          color:'#27374d',
          '&.Mui-checked': {
            color: '#27374d',
          },
        }}
      />}
              
            />
            <label id="rem-log"> Remember me</label>
          </FormGroup>
         
        </div>
        <Button id="btn" type="submit" variant="contained">
          {loading ? <WhiteLoader/>: "Login"}
        </Button>
       
      </form>
    </>
  )
}

export default AdminLogin