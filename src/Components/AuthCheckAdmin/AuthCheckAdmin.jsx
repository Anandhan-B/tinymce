import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'

const AuthCheckAdmin = () => {
    const [noAuth,setNoAuth] = useState(true)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const checkAuth = async()=>{
            const token = localStorage.getItem("bulkmailadmintoken");
            if(!token) return setLoading(false)
            try{
            const response = await axios.post(
                "http://localhost:7000/api/v1/admin/verify-token/",{},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setNoAuth(false);
              setLoading(false);
            }catch(err){
                setLoading(false);
            }
        }
        checkAuth();
    },[])

    if(loading) return(<Loader/>)
  return (
    noAuth ? <Outlet/> : <Navigate to="/admin/dashboard" />
  )
}

export default AuthCheckAdmin