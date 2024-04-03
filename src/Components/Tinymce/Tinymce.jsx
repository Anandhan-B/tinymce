import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { Textarea } from "@mui/joy";
import { useLocation } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import "./tinymce.css";
import { styled } from "@mui/system";
import WhiteLoader from "../WhiteLoader/WhiteLoader";

const MyTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#27374d", // Focused border color
    },
  },
}));

const Tinymce = () => {
  const editorRef = useRef(null);
  const [email, setEmail] = useState([]);
  const [subject, setSubject] = useState("");
  const [mailCount, setMailCount] = useState(0);
  const [loading, setLoading] = useState(false);
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
            { email: validMails, subject, content },
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
              <label><FiUpload/>
                <input type="file" name="" id="" accept=".csv" style={{display:'none'}} />
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
