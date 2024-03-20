import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { TextField, Button } from '@mui/material';
import swal from 'sweetalert2';
import axios from 'axios';
import './tinymce.css'
import { styled } from '@mui/system';
import WhiteLoader from '../WhiteLoader/WhiteLoader';

const MyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
  },
}));

const Tinymce = () => {
    const editorRef = useRef(null);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);
    
    const validateEmail = (email) => {
      return String(email)
          .toLowerCase()
          .match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };
  const sendMail = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    if (editorRef.current) {
     
      if(email && validateEmail(email)){
      const content = editorRef.current.getContent();
      //console.log(content);
      try {
        setLoading(true)
        const response = await axios.post(
          'http://localhost:7000/api/v1/user/mail',{ email, subject, content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        swal.fire({
        title: "Success",
        text: response.data,
        icon: "success",
        timer: 1000,
        });
      } catch (error) {
        setLoading(false)
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
    <div className="tinymce">
    <Editor
          
          onInit={(evt, editor) => editorRef.current = editor}
          apiKey='qp0heog9dajv9y1me4lgf5l9layggufynvqbwsbyd26rbt8t'
          init={{
            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(async() => {
              const token = localStorage.getItem("bulkmailusertoken");
              if (!token)
                return swal.fire("Error", "Session Expired, try again later", "error");
                  try {
                    const response = await axios.post(
                      'http://localhost:7000/api/v1/user/chat',{ "prompt": request },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    return response.data
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
                })  
          }}
          initialValue="Write Your Email here"
        />
        </div>
        
        <div className='sendto'>
        <MyTextField id="outlined-basic" label="Send to" variant="outlined" type='email' required onChange={(e)=> setEmail(e.target.value)} />
        <button className='box-btn' variant="contained" type='submit'>{loading ? <WhiteLoader/> : "Send"}</button> 
        </div>
        </form>
        </>
  )
}

export default Tinymce