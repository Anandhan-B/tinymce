import React, { useState } from "react";
import "./translate.css";
import { Textarea } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
import swal from "sweetalert2";
import { IoMdSwap } from "react-icons/io";

const Translate = () => {
  const [from, setFrom] = useState("English");
  const [to, setTo] = useState("English");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [copy, setCopy] = useState("Copy");
  const translateLanguages = [
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

  const languageTags = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
    "Arabic": "ar",
    "Armenian": "hy",
    "Azerbaijani": "az",
    "Basque": "eu",
    "Belarusian": "be",
    "Bengali": "bn",
    "Bosnian": "bs",
    "Bulgarian": "bg",
    "Catalan": "ca",
    "Cebuano": "ceb",
    "Chichewa": "ny",
    "Chinese (Simplified)": "zh-CN",
    "Chinese (Traditional)": "zh-TW",
    "Corsican": "co",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "English": "en",
    "Esperanto": "eo",
    "Estonian": "et",
    "Filipino": "tl",
    "Finnish": "fi",
    "French": "fr",
    "Frisian": "fy",
    "Galician": "gl",
    "Georgian": "ka",
    "German": "de",
    "Greek": "el",
    "Gujarati": "gu",
    "Haitian Creole": "ht",
    "Hausa": "ha",
    "Hawaiian": "haw",
    "Hebrew": "he",
    "Hindi": "hi",
    "Hmong": "hmn",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Igbo": "ig",
    "Indonesian": "id",
    "Irish": "ga",
    "Italian": "it",
    "Japanese": "ja",
    "Javanese": "jv",
    "Kannada": "kn",
    "Kazakh": "kk",
    "Khmer": "km",
    "Kinyarwanda": "rw",
    "Korean": "ko",
    "Kurdish (Kurmanji)": "ku",
    "Kyrgyz": "ky",
    "Lao": "lo",
    "Latin": "la",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Luxembourgish": "lb",
    "Macedonian": "mk",
    "Malagasy": "mg",
    "Malay": "ms",
    "Malayalam": "ml",
    "Maltese": "mt",
    "Maori": "mi",
    "Marathi": "mr",
    "Mongolian": "mn",
    "Myanmar (Burmese)": "my",
    "Nepali": "ne",
    "Norwegian": "no",
    "Odia (Oriya)": "or",
    "Pashto": "ps",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese": "pt",
    "Punjabi": "pa",
    "Romanian": "ro",
    "Russian": "ru",
    "Samoan": "sm",
    "Scots Gaelic": "gd",
    "Serbian": "sr",
    "Sesotho": "st",
    "Shona": "sn",
    "Sindhi": "sd",
    "Sinhala": "si",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Somali": "so",
    "Spanish": "es",
    "Sundanese": "su",
    "Swahili": "sw",
    "Swedish": "sv",
    "Tajik": "tg",
    "Tamil": "ta",
    "Tatar": "tt",
    "Telugu": "te",
    "Thai": "th",
    "Turkish": "tr",
    "Turkmen": "tk",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Uyghur": "ug",
    "Uzbek": "uz",
    "Vietnamese": "vi",
    "Welsh": "cy",
    "Xhosa": "xh",
    "Yiddish": "yi",
    "Yoruba": "yo",
    "Zulu": "zu"
  }
  

  const submitForm = async (e) => {
    e.preventDefault();
    if (from === to) return setOutput(text);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/translate",
        { from, to, text }
      );
      swal.fire({
        title: "Success",
        icon: "success",
        timer: 1000,
      });
      setOutput(response.data);
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
  };

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };
  const copyData = async () => {
    if (!output) return swal.fire({ title: "No data to copy", icon: "info" });
    await navigator.clipboard.writeText(output);
    setCopy("Copied");
    setTimeout(() => {
      setCopy("Copy");
    }, 3000);
  };

  const speak = async () => {
    if (!output) return swal.fire({ title: "No data to speak", icon: "info" });
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(output);
    utterance.lang = languageTags[to];
    synth.speak(utterance);
  };

  return (
    <>
      <form className="container" onSubmit={submitForm}>
        <div className="section left">
          <div className="dropdown">
            From:{" "}
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              name="language"
              className="select"
              required
              id="fromlang"
            >
            {translateLanguages.map(language => <option value={language}>{language}</option>)}

              
            </select>
          </div>
          <Textarea
            required
            onChange={(e) => setText(e.target.value)}
            className="box"
            minRows={10}
            maxRows={10}
            placeholder="Type something..."
          />
        </div>
        <div className="middle">
          <IoMdSwap onClick={swap} className="icon" />
          <button className="btn-tra" variant="contained" type="submit">
            Translate
          </button>
        </div>
        <div className="section right">
          <div className="dropdown">
            To:{" "}
            <select
              value={to}
              name="language"
              onChange={(e) => setTo(e.target.value)}
              className="select"
              required
              id="tolang"
            >
              {translateLanguages.map(language => <option value={language}>{language}</option>)}
            </select>
          </div>
          <Textarea
            className="box"
            value={output}
            minRows={10}
            maxRows={10}
            placeholder="Your output here..."
          />
          <Button className="copy" variant="contained" onClick={copyData}>
            {copy}
          </Button>
          <Button className="copy" variant="contained" onClick={speak}>
            Speak
          </Button>
        </div>
      </form>
    </>
  );
};

export default Translate;
