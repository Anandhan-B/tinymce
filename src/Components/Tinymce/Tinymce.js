import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { TextField, Button } from '@mui/material';
import swal from 'sweetalert2';
import axios from 'axios';
import './tinymce.css'

const Tinymce = () => {
    const editorRef = useRef(null);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    
    const validateEmail = (email) => {
      return String(email)
          .toLowerCase()
          .match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };
  const sendMail = (e) => {
    e.preventDefault();
    if (editorRef.current) {
     
      if(email && validateEmail(email)){
      const content = editorRef.current.getContent();
      //console.log(content);
      fetch('http://localhost:7000/api/v1/user/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, content }),
      })
        .then(response => {
          return response.text()
        }).then((message)=>{
          swal.fire({
            title: "Success",
            text: message,
            icon: "success",
          });
        })
        .catch(error => {
          swal.fire({
            title: "Error",
            text: error,
            icon: "error",
          });       
        });
      }
      else{
        swal.fire({
          title: "Error",
          text: "Enter Valid Email",
          icon: "error",
        });
      }

    }
  };


  return (
    <>
    <form action="" onSubmit={sendMail}>
      <div className="subject">
        <input className='sub' type="text" onChange={(e)=> setSubject(e.target.value)} placeholder='Enter the Subject' required />
    </div>
    <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          apiKey='tfyzrg3tr3jrtu9gumn98vndqvc0rsmqtajqnizirws42yde'
          init={{
            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.resolve(
                axios.post('http://localhost:7000/api/v1/user/chat',{ "prompt": request } )
                .then((response)=>{
                    if(!(response.status === 200)){
                      swal.fire({
                        title:"Error",
                        text:response.data,
                        icon:"error"
                      })
                      return
                    }
                    return response.data
                }).catch((err)=>{
                  swal.fire({
                    title:"Error",
                    text: err.message,
                    icon:"error"
                  })
                })
            )),
          }}
          initialValue="Write Your Email here"
         
        />
        
        <div className='box'>
        <TextField id="outlined-basic" label="Send to" variant="outlined" type='email' required onChange={(e)=> setEmail(e.target.value)} />
        <Button variant="contained" type='submit'>Send</Button> 
        </div>
        </form>
        </>
  )
}

export default Tinymce