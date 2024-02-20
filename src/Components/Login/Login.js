import React from "react";
import "../Login/Login.css";
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
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { styled } from '@mui/system';


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



export const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const loginUser = async (e) => {
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
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/login",
        {
          email,
          password,
        }
      );
      if (response.status !== 200)
        return swal.fire({
          title: response.statusText,
          text: response.data,
          icon: "error",
        });
      swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
        timer: 3000,
      });
      localStorage.setItem("bulkmailusertoken", response.data.token);
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
    <>
      <form id="body" onSubmit={loginUser}>
        <Typography>
          <h2 id="h2-log">Login </h2>
          <div id="underline"></div>
        </Typography>
        <MyTextField
          id="mail-log"
          label="Email"
          type="email "

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
          <Link href="#" id="fgt">
            Forget Password?
          </Link>
        </div>
        <Button id="btn" type="submit" variant="contained">
          Login
        </Button>
        <div id="aup-log">
          <label id="dont-log">Don't have an account?</label>
          <Link id="log-signup" to="/Signup">
            &nbsp; Signup
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
