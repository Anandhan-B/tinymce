import React from 'react'
import './app.css'
import { createBrowserRouter, RouterProvider, Routes, Route} from "react-router-dom";
import Tinymce from './Components/Tinymce/Tinymce';
import Chatgpt from './Components/Chatgpt/Chatgpt';
import Translate from './Components/Translate/Translate';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminDashboard from './Components/AdminDashboard/ADashboard';
import ForgetPassword from './Components/Forget-Password/ForgetPassword';
import Otp from './Components/Forget-Password/Otp';
import Reset from './Components/Forget-Password/Reset';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AuthCheck from './Components/AuthCheck/AuthCheck';

/* const router = createBrowserRouter([
  {
    path:"/",
    element: <Tinymce/>
  },
  {
    path:"/chat",
    element: <Chatgpt/>
  },
  {
    path:"/translate",
    element:<Translate/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element: <Signup/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/admin",
    element:<AdminDashboard/>
  },
  {
    path:"/forgot-password",
    element:<ForgetPassword/>
  },
  {
    path:"/otp",
    element:<Otp/>
  },
  {
    path:"/reset",
    element:<Reset/>
  },

]);
 */

const App = () => {
  return (
    <>
    {/* <RouterProvider router={router}/> */}
    <Routes>
      <Route Component={AuthCheck}>
        <Route path='/' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
      </Route>
      
      <Route Component={ProtectedRoute}>
        <Route path='/chat' Component={Chatgpt}/>
        <Route path='/translate' Component={Translate}/>
        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/admin' Component={AdminDashboard}/>
        <Route path='/forgot-password' Component={ForgetPassword}/>
        <Route path='/otp' Component={Otp}/>
        <Route path='/reset' Component={Reset}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
//Command