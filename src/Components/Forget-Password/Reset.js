import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import './Reset.css'
import { useState } from 'react'
import Swal from 'sweetalert2'

function Reset() {
  const [password, setPassword] = useState()
  const [resetpassword, setResetpassword] = useState()
  const reset = async () => {

    if (!password || !resetpassword) {
      Swal.fire('Error', 'Please enter all the fields', 'error')
      return
    }

    if(password.length < 8){
      Swal.fire('Error','Password must in 8 Characters','error')
      return
    }

    if(password !== resetpassword){
      Swal.fire('Error','Password does not match','error')
      return
    }

  }
  return (
    <div id='reset-body'>
      <div id='reset'>
        <Typography variant='h5'>Reset your Password</Typography>
        <TextField
          id=''
          label='New Password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <TextField
          id=''
          label='Reset Password'
          variant='outlined'
          type='password'
          value={resetpassword}
          onChange={(e) => setResetpassword(e.target.value)}
        />
        <Button variant='contained' onClick={reset} color='primary'>Change</Button>
      </div>
    </div>
  )
}
export default Reset