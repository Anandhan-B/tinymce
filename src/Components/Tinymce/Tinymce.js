import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { TextField, Button } from '@mui/material';
import './style.css'

const Tinymce = () => {
    const editorRef = useRef(null);
    const [email, setEmail] = useState('');
    const handleEmailChange = (e)=>{
      setEmail(e.target.value)
      console.log(e.target.value);
    }
  const log = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log(content);

      fetch('http://localhost:7000/api/v1/user/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,content }),
      })
        .then(response => {
          alert("email sent")
        })
        .catch(error => {
          alert('error');
        });

    }
  };


  return (
    <>
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
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
          initialValue="Welcome to TinyMCE!"
        />
        <div className='box'>
        <TextField id="outlined-basic" label="Send to" variant="outlined" required onChange={handleEmailChange} />
        <Button variant="contained" onClick = {log}>Send</Button>
        </div>
        </>
  )
}

export default Tinymce