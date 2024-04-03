import React, { useState } from "react";
import "./AICreator.css";
import { Textarea } from "@mui/joy";
import { Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FcSpeaker } from "react-icons/fc";
import { BiNotepad } from "react-icons/bi";
import { ImParagraphLeft } from "react-icons/im";
import { MdOutlineEmail } from "react-icons/md";
import { FaList, FaMagic } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { TfiRuler } from "react-icons/tfi";
import WhiteLoader from "../WhiteLoader/WhiteLoader";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import axios from 'axios'
import swal from 'sweetalert2'

const AICreator = () => {
  const [query, setQuery] = useState("");
  const [activeTone, setActiveTone] = useState(false);
  const [activeFormat, setActiveFormat] = useState(false);
  const [activeLength, setActiveLength] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyClick, setCopyClick] = useState(false);
  const [language, setLanguage] = useState("English");

  const Languages = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chichewa",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Filipino",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hawaiian",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Kinyarwanda",
    "Korean",
    "Kurdish (Kurmanji)",
    "Kyrgyz",
    "Lao",
    "Latin",
    "Latvian",
    "Lithuanian",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Mongolian",
    "Myanmar (Burmese)",
    "Nepali",
    "Norwegian",
    "Odia (Oriya)",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Samoan",
    "Scots Gaelic",
    "Serbian",
    "Sesotho",
    "Shona",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tajik",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Turkish",
    "Turkmen",
    "Ukrainian",
    "Urdu",
    "Uyghur",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu",
  ];

  const generateDraft = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    if (!(query.trim()))
      return swal.fire("Hey!", "Ask Something to AI 🙃", "info");
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/aicreator",
        { prompt: query, tone: activeTone, format: activeFormat, length: activeLength, language },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      swal.fire({
        title: response.statusText,
        text: "Success",
        icon: "Success",
      });
      setResult(response.data);
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
  };

  const copyData = async () => {
    if (!result) return swal.fire({ title: "No data to copy", icon: "info" });
    await navigator.clipboard.writeText(result);
    setCopyClick(true);
    setTimeout(() => {
      setCopyClick(false);
    }, 3000);
  };

  return (
    <>
      <form onSubmit={generateDraft} className="aic-container">
        <div className="aic-title">Write About</div>
        <div className="aic-query">
          <Textarea
            className="aic-query-box"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Write a leave letter"
            required
            minRows={4}
            maxRows={10}
            endDecorator={
              <Typography level="body-xs" sx={{ ml: "auto" }}>
                {query.length}/2000
              </Typography>
            }
            sx={{ minWidth: 300 }}
          />
        </div>
        <div className="aic-tones">
          <div className="aic-title tone-line">
            <FcSpeaker className="aic-icon" /> <div>Tone</div>
          </div>
          <div className="aic-tones-lists">
            <div className="aic-tones-list">
              <Button
                variant={
                  activeTone === "Professional" ? "contained" : "outlined"
                }
                onClick={() => setActiveTone("Professional")}
              >
                Professional
              </Button>
            </div>
            <div className="aic-tones-list">
              <Button
                variant={activeTone === "Casual" ? "contained" : "outlined"}
                onClick={() => setActiveTone("Casual")}
              >
                Casual
              </Button>
            </div>
            <div className="aic-tones-list">
              <Button
                variant={
                  activeTone === "Enthusiastic" ? "contained" : "outlined"
                }
                onClick={() => setActiveTone("Enthusiastic")}
              >
                Enthusiastic
              </Button>
            </div>
            <div className="aic-tones-list">
              <Button
                variant={
                  activeTone === "Informational" ? "contained" : "outlined"
                }
                onClick={() => setActiveTone("Informational")}
              >
                Informational
              </Button>
            </div>
            <div className="aic-tones-list">
              <Button
                variant={activeTone === "Funny" ? "contained" : "outlined"}
                onClick={() => setActiveTone("Funny")}
              >
                Funny
              </Button>
            </div>
            <div className="aic-tones-list">
              <Button
                variant={activeTone === "Poetic" ? "contained" : "outlined"}
                onClick={() => setActiveTone("Poetic")}
              >
                Poetic
              </Button>
            </div>
          </div>
        </div>

        <div className="aic-formats">
          <div className="aic-title tone-line">
            <BiNotepad className="aic-icon" /> <div>Format</div>
          </div>
          <div className="aic-tones-lists">
            <div className="aic-formats-list">
              <Button
              sx={{
                padding:'1rem',
                fontSize:'20pt'
              }}
                variant={
                  activeFormat === "Paragraph" ? "contained" : "outlined"
                }
                className="aic-big-icon"
                color="secondary"
                onClick={() => setActiveFormat("Paragraph")}
              >
                <ImParagraphLeft />
              </Button>
              <small>Paragraph</small>
            </div>

            <div className="aic-formats-list">
              <Button
              sx={{
                padding:'1rem',
                fontSize:'20pt'
              }}
                variant={activeFormat === "Email" ? "contained" : "outlined"}
                className="aic-big-icon"
                color="secondary"
                onClick={() => setActiveFormat("Email")}
              >
                <MdOutlineEmail />
              </Button>
              <small>Email</small>
            </div>

            <div className="aic-formats-list">
              <Button
              sx={{
                padding:'1rem',
                fontSize:'20pt'
              }}
                variant={activeFormat === "Ideas" ? "contained" : "outlined"}
                className="aic-big-icon"
                color="secondary"
                onClick={() => setActiveFormat("Ideas")}
              >
                <FaList />
              </Button>
              <small>Ideas</small>
            </div>

            <div className="aic-formats-list">
              <Button
              sx={{
                padding:'1rem',
                fontSize:'20pt'
              }}
                variant={
                  activeFormat === "Blog Post" ? "contained" : "outlined"
                }
                className="aic-big-icon"
                color="secondary"
                onClick={() => setActiveFormat("Blog Post")}
              >
                <FaRegNewspaper />
              </Button>
              <small>Blog Post</small>
            </div>
          </div>
        </div>

        <div className="aic-tones">
          <div className="aic-title tone-line">
            <TfiRuler className="aic-icon" /> <div>Length</div>
          </div>
          <div className="aic-tones-lists">
            <div className="aic-tones-list">
              <Button
                variant={activeLength === "Small" ? "contained" : "outlined"}
                onClick={() => setActiveLength("Small")}
              >
                Small
              </Button>
            </div>
            <div className="aic-tones-list">
              <Button
                variant={activeLength === "Medium" ? "contained" : "outlined"}
                onClick={() => setActiveLength("Medium")}
              >
                Medium
              </Button>
            </div>
            <div className="aic-tones-list">
              <Button
                variant={activeLength === "Long" ? "contained" : "outlined"}
                onClick={() => setActiveLength("Long")}
              >
                Long
              </Button>
            </div>
          </div>
        </div>
        <div className="aic-lang-dropdown">
            <span>Language: </span>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                autoWidth
                required
                label="Language"
                size="small"
              >
                
                {Languages.map((lang) => (
                  <MenuItem value={lang}>{lang}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        <div className="aic-submit">
          <Button type="submit" variant="contained" className="aic-submit-btn" sx={{ width: "100%" , background:'#27374d'}}>
            { loading ? <WhiteLoader/> : "Ask AI" }
          </Button>
        </div>
        
        <br />
        <br />
        <br />

        <div className="aic-result-div">
          <div className="aic-title tone-line">
            <FaMagic className="aic-icon" /> <div>Preview</div>
          </div>
          <div className="aic-res">
            <Textarea
            className="aic-res-box"
            onChange={(e) => setResult(e.target.value)}
            placeholder="AI Generated Response"
            value={result}
            minRows={10}
            maxRows={20}
            endDecorator={
              <Typography level="body-xs" sx={{ ml: "auto" }}>
                {result.length}/2000
              </Typography>
            }
            sx={{ minWidth: 300 }}
          />
          </div>
          <div className="copy" variant="contained" onClick={copyData}>
              {copyClick ? <FaCheck /> : <MdOutlineContentCopy />}
            </div>
        </div>
      </form>
    </>
  );
};

export default AICreator;
