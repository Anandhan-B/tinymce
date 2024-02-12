import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'


const Chatgpt = () => {
    const [prompt,setPrompt] = useState('');
    const handlePromptChange = (e)=>{
        setPrompt(e.target.value)
    }
    const sendPrompt = ()=>{
        
    }
  return (
   <>
    <TextField id="outlined-basic" label="Send to" variant="outlined" required onChange={handlePromptChange} />
    <Button variant='contained' onClick={sendPrompt}>Ask GPT</Button>
   </>
  )
}

export default Chatgpt