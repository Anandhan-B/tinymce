import React, { useState } from "react";
import "./translate.css";
import { Textarea } from "@mui/joy";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import axios from "axios";
import swal from "sweetalert2";
import { IoMdSwap } from "react-icons/io";
import WhiteLoader from "../WhiteLoader/WhiteLoader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Translate = () => {
  const [from, setFrom] = useState("English");
  const [to, setTo] = useState("English");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [copyClick, setCopyClick] = useState(false);
  const [loading, setLoading] = useState(false);
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
    Afrikaans: "af",
    Albanian: "sq",
    Amharic: "am",
    Arabic: "ar",
    Armenian: "hy",
    Azerbaijani: "az",
    Basque: "eu",
    Belarusian: "be",
    Bengali: "bn",
    Bosnian: "bs",
    Bulgarian: "bg",
    Catalan: "ca",
    Cebuano: "ceb",
    Chichewa: "ny",
    "Chinese (Simplified)": "zh-CN",
    "Chinese (Traditional)": "zh-TW",
    Corsican: "co",
    Croatian: "hr",
    Czech: "cs",
    Danish: "da",
    Dutch: "nl",
    English: "en",
    Esperanto: "eo",
    Estonian: "et",
    Filipino: "tl",
    Finnish: "fi",
    French: "fr",
    Frisian: "fy",
    Galician: "gl",
    Georgian: "ka",
    German: "de",
    Greek: "el",
    Gujarati: "gu",
    "Haitian Creole": "ht",
    Hausa: "ha",
    Hawaiian: "haw",
    Hebrew: "he",
    Hindi: "hi",
    Hmong: "hmn",
    Hungarian: "hu",
    Icelandic: "is",
    Igbo: "ig",
    Indonesian: "id",
    Irish: "ga",
    Italian: "it",
    Japanese: "ja",
    Javanese: "jv",
    Kannada: "kn",
    Kazakh: "kk",
    Khmer: "km",
    Kinyarwanda: "rw",
    Korean: "ko",
    "Kurdish (Kurmanji)": "ku",
    Kyrgyz: "ky",
    Lao: "lo",
    Latin: "la",
    Latvian: "lv",
    Lithuanian: "lt",
    Luxembourgish: "lb",
    Macedonian: "mk",
    Malagasy: "mg",
    Malay: "ms",
    Malayalam: "ml",
    Maltese: "mt",
    Maori: "mi",
    Marathi: "mr",
    Mongolian: "mn",
    "Myanmar (Burmese)": "my",
    Nepali: "ne",
    Norwegian: "no",
    "Odia (Oriya)": "or",
    Pashto: "ps",
    Persian: "fa",
    Polish: "pl",
    Portuguese: "pt",
    Punjabi: "pa",
    Romanian: "ro",
    Russian: "ru",
    Samoan: "sm",
    "Scots Gaelic": "gd",
    Serbian: "sr",
    Sesotho: "st",
    Shona: "sn",
    Sindhi: "sd",
    Sinhala: "si",
    Slovak: "sk",
    Slovenian: "sl",
    Somali: "so",
    Spanish: "es",
    Sundanese: "su",
    Swahili: "sw",
    Swedish: "sv",
    Tajik: "tg",
    Tamil: "ta",
    Tatar: "tt",
    Telugu: "te",
    Thai: "th",
    Turkish: "tr",
    Turkmen: "tk",
    Ukrainian: "uk",
    Urdu: "ur",
    Uyghur: "ug",
    Uzbek: "uz",
    Vietnamese: "vi",
    Welsh: "cy",
    Xhosa: "xh",
    Yiddish: "yi",
    Yoruba: "yo",
    Zulu: "zu",
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    if (from === to) return setOutput(text);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/translate",
        { from, to, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      swal.fire({
        title: "Success",
        icon: "success",
        timer: 1000,
      });
      setOutput(response.data);
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
  };

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };
  const copyData = async () => {
    if (!output) return swal.fire({ title: "No data to copy", icon: "info" });
    await navigator.clipboard.writeText(output);
    setCopyClick(true);
    setTimeout(() => {
      setCopyClick(false);
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
        <div className="dropdown-row">
          <div className="dropdown">
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                From
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                autoWidth
                required
                label="From"
              >
                {translateLanguages.map((language) => (
                  <MenuItem value={language}>{language}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="swap">
            <IoMdSwap onClick={swap} className="swap-icon" />
          </div>
          <div className="dropdown">
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                To
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                autoWidth
                required
                label="To"
              >
                {translateLanguages.map((language) => (
                  <MenuItem value={language}>{language}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="translate-from">
          <Textarea
            required
            onChange={(e) => setText(e.target.value)}
            className="box"
            minRows={10}
            maxRows={10}
            placeholder="Type something..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: "Red", // Change this to your desired color
              },
            }}
          />
        </div>
        <div className="translate-btn">
          <button className="btn-tra" variant="contained" type="submit">
            {loading ? <WhiteLoader /> : "Translate"}
          </button>
        </div>
        <div className="translate-result">
          <Textarea
            className="box"
            value={output}
            minRows={10}
            maxRows={10}
            placeholder="Your output here..."
          />
        </div>

        {/* <div className="c-s">
            <div className="copy" variant="contained" onClick={copyData}>
              {copyClick ? <FaCheck /> : <MdOutlineContentCopy />}
            </div>
            <div className="speak" variant="contained" onClick={speak}>
              <HiMiniSpeakerWave />
            </div>
          </div> */}
      </form>
    </>
  );
};

export default Translate;
