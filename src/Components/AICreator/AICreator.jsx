import React, { useState } from "react";
import "./AICreator.css";
import { Textarea } from "@mui/joy";
import { Typography, Button } from "@mui/material";
import { FcSpeaker } from "react-icons/fc";
import { BiNotepad } from "react-icons/bi";
import { ImParagraphLeft } from "react-icons/im";
import { MdOutlineEmail } from "react-icons/md";
import { FaList, FaMagic } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { TfiRuler } from "react-icons/tfi";
import WhiteLoader from "../WhiteLoader/WhiteLoader";

const AICreator = () => {
  const [query, setQuery] = useState("");
  const [activeTone, setActiveTone] = useState("based on question");
  const [activeFormat, setActiveFormat] = useState("based on question");
  const [activeLength, setActiveLength] = useState("based on question");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const generateDraft = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("bulkmailusertoken");
    if (!token)
      return swal.fire("Error", "Session Expired, try again later", "error");
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/aicreator",
        { prompt: query, tone: activeTone, format: activeFormat, length: activeLength },
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
        <div className="aic-submit">
          <Button type="submit" variant="contained" sx={{ width: "100%" }}>
            Ask AI
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
              placeholder="AI Generated Result"
              value={result}
              required
              minRows={10}
              maxRows={20}
              endDecorator={
                <Typography level="body-xs" sx={{ ml: "auto" }}>
                  {query.length}/2000
                </Typography>
              }
              sx={{ minWidth: 300 }}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AICreator;
