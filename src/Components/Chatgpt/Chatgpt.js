import { Button, TextField, TextareaAutosize } from '@mui/material'
import React, { useState } from 'react'
import './style.css'


const Chatgpt = () => {
    const [prompt,setPrompt] = useState('');
    const [result,setResult] = useState(''); 
    const handlePromptChange = (e)=>{
        setPrompt(e.target.value)
    }
    const sendPrompt = ()=>{
        fetch('http://localhost:7000/api/v1/user/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt}),
      })
        .then(response => {
            return response.text()
        }).then(data =>{
            setResult(data)
            console.log(data);
        })
        .catch(error => {
          setResult(error)
        });
    }
  return (
   <>
   <div className="box">
    <TextField id="outlined-basic" className='prompt' label="Enter Prompt" variant="outlined" required onChange={handlePromptChange} />
    <Button variant='contained' onClick={sendPrompt}>Ask GPT</Button>
    </div>
    <TextareaAutosize className='area' aria-label="minimum height" value={result} placeholder='Empty' minRows={3}  />

   </>
  )
}

export default Chatgpt