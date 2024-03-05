import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import swal from "sweetalert2"

const ProtectedRoute = () => {
    const [auth,setAuth] = useState(false)
    const [loading,setLoading] = useState(true)
  useEffect(() => {
    console.log("in effect");
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
          localStorage.setItem("bulkmailuserdata", response.data);
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
  if(loading) return (<div>Loading...</div>)
  return (
    auth ? <Outlet /> : <Navigate to="/" />
    );
};

export default ProtectedRoute;
