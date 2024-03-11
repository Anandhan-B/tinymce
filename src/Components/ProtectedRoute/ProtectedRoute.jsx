import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProtectedRoute = () => {
    const [userData,setData] = useState("Sample Data")
    const [auth,setAuth] = useState(false)
    const [loading,setLoading] = useState(true)
  useEffect(() => {
    const validate = async () => {
      // let propMessage = null
      const token = localStorage.getItem("bulkmailusertoken");
      if(!token) return setLoading(false)
        try {
          const response = await axios.post(
            "http://localhost:7000/api/v1/user/verify-token/",{},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // localStorage.setItem("bulkmailuserdata", response.data);
          setData(response.data)
          console.log("Main Data : ",response.data)
          setAuth(true);
          setLoading(false);

        } catch (err) {
            setLoading(false);
           /* if (err.response && err.response.status) {
               let propMessage = err.response.data
               swal.fire({ title: err.response.statusText, text: err.response.data, icon: "error" });
            } else {
              swal.fire({ title: "Error", text: err.message, icon: "error" });
            }  */
        }
      
    };
      validate()    
  }, []);
  if(loading) return (<Loader/>)
  return (
    auth ? <Outlet context={userData} /> : <Navigate to="/" />
    );
};

export default ProtectedRoute;
