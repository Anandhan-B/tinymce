import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { MdAddBox } from "react-icons/md";
import { Textarea } from "@mui/joy";
import { useLocation } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import "./tinymce.css";
import { styled } from "@mui/system";
import WhiteLoader from "../WhiteLoader/WhiteLoader";
import SimpleLoader from '../SimpleLoader/SimpleLoader'

const MyTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#27374d", // Focused border color
    },
  },
}));

const Tinymce = () => {
  const editorRef = useRef(null);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [attachments, setAttachments] = useState(null);
  const [mailCount, setMailCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [upLoading, setUPLoading] = useState(false);
  const [attachName, setAttachName] = useState("");
  const { state } = useLocation()
  useEffect(()=>{
    console.log("noth", state);
    if(state){
      console.log(state);
      setEmail(state)
      countMail(state)
    }
  },[state])
  const validateEmail = (email) => {
    return String(email).trim()
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const countMail = (emails) =>{
    let count = 0;
    emails.map(m=>{
      if(m && validateEmail(m)) count+=1
    })
    setMailCount(count)
  }
  const sendMail = async (e) => {
    e.preventDefault();
    console.log(email)
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    if (editorRef.current) {
      if (email && email.some(validateEmail)) {
        const content = editorRef.current.getContent();
        const validMails = email.map(e => e.trim()).filter(validateEmail);
        console.log(validMails);
        try {
          setLoading(true);

          const response = await axios.post(
            "http://localhost:7000/api/v1/user/mail",
            { email: validMails, subject, content, attachments, attachName},
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
          setLoading(false);
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
      } else {
        swal.fire({
          title: "Error",
          text: "Enter Valid Email",
          icon: "error",
        });
      }
    }
  };

  const checkFileSize = (e) => {
    const file = e.target.files[0];
    const maxSize = 25 * 1024 * 1024; 
  
    if (file && file.size > maxSize) {
      swal.fire('File Too Large','File size exceeds the limit (25MB). Please choose a smaller file.','warning');
      e.target.value = '';
      return true
    }
    return false
  }

  const readCSV = async (e) => {
    try{
    const file = e.target.files[0]
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    setUPLoading(true)
    const emails = [];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const rows = content.split("\n");
      rows.forEach((row) => {
        const rowData = row.split(",");
        rowData.map((data) => {
          if (validateEmail(data)) emails.push(data);
        });
      });
      setUPLoading(false)
      if (emails.length === 0){
        return swal.fire("Not Found", "No Emails found in the file", "info");
      }
      setEmail(prev => `${prev? prev+", ":""}${emails}`,()=>countMail(emails))
      
    }
    reader.onerror = (e)=>{
      setUPLoading(false)
      return swal.fire("Can't read File", "An error accured when reading file", "error");
    }
    reader.readAsText(file);
    }
    catch(err){
      setUPLoading(false)
      return swal.fire("Can't read File", "An error accured when reading file", "error");

    }
  };

  return (
    <>
      <form action="" onSubmit={sendMail}>
        <div className="mce-containers">
          <div className="mce-label"><h3>To:</h3></div>
          <Textarea
          spellCheck='false'
            variant="outlined"
            onChange={(e) => {
              const value = e.target.value.split(",");
              setEmail(value);
              countMail(value);
            }}
            placeholder="Send To.."
            className="subject mce-grow"
            value={email}
            required
            minRows={2}
            maxRows={4}
            endDecorator={
              <>
              <Typography level="body-xs" sx={{ ml: "auto" }}>
                {mailCount} mail(s)
              </Typography>&nbsp;&nbsp;
              <label>{ upLoading? <SimpleLoader/> : <FiUpload/>}
                <input type="file" name="" id="" accept=".csv" onChange={readCSV} style={{display:'none'}} />
              </label>
              </>
            }
            sx={{ minWidth: 300 }}
          />
        </div>
        <div className="mce-containers">
        <div className="mce-label"><h3>Subject:</h3></div>
          <Textarea
            className="subject mce-grow"
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter the Subject"
            required
            minRows={2}
            maxRows={4}
            endDecorator={
              <Typography level="body-xs" sx={{ ml: "auto" }}>
                {subject.length} character(s)
              </Typography>
            }
            sx={{ minWidth: 300 }}
          />
        </div>
        <div className="tinymce">
        <div className="mce-label"><h3>Body:</h3></div>
        <div className="mce-grow">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="5z1bza2sxo65yy46a26rsn1wjdnf7iheokvzvyib1i89mn2y"
            init={{
              plugins:
                "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(async () => {
                  const token = localStorage.getItem("bulkmailusertoken");
                  if (!token)
                    return swal.fire(
                      "Error",
                      "Session Expired, try again later",
                      "error"
                    );
                  try {
                    const response = await axios.post(
                      "http://localhost:7000/api/v1/user/chat",
                      { prompt: request },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    return response.data;
                  } catch (error) {
                    if (error.response.status) {
                      swal.fire({
                        title: error.response.statusText,
                        text: error.response.data,
                        icon: "error",
                      });
                    } else {
                      swal.fire({
                        title: "Error",
                        text: error.message,
                        icon: "error",
                      });
                    }
                  }
                }),
            }}
            initialValue="Write Your Email here"
          />
          </div>
        </div>
        <div className="mce-containers">
        <div className="mce-label"><h3>Attach:</h3></div>
          <label>
            <div style={{fontSize:'30pt',color:'#27374d',cursor:'pointer'}}><MdAddBox/></div>
          <input type="file" onChange={(e)=> {
            if(checkFileSize(e)) return
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = async () => {
              try {
                const fileData = reader.result.split(',')[1];
                setAttachments(fileData)
                setAttachName(e.target.files[0].name)
              } catch (error) {
                swal.fire('','Error reading file','info');
              }
            };
            
          }} hidden /> {attachName}
          </label>
        </div>


        <div className="sendto">
          <button className="box-btn" variant="contained" type="submit">
            {loading ? <WhiteLoader /> : "Send"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Tinymce;
