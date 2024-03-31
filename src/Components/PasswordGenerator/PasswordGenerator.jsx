import React, { useState } from "react";
import "./PasswordGenerator.css";
import { ModalClose } from "@mui/joy";


const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(15);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [excludeDuplicate, setExcludeDuplicate] = useState(false);
  const [passId, setPassId] = useState("s32");
  const [icval, setIcval] = useState("copy_all");

  const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~",
  };

  const generatePassword = () => {
    let charSet = "";

    if (includeLowercase) charSet += characters.lowercase;
    if (includeUppercase) charSet += characters.uppercase;
    if (includeNumbers) charSet += characters.numbers;
    if (includeSymbols) charSet += characters.symbols;

    let generatedPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
      generatedPassword += randomChar;
    }

    setPassword(generatedPassword);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setIcval("check");
  setTimeout(() => {
    setIcval("copy_all");
  }, 1500);
  };
  const updatePassIndicator = () => {
    setPassId(
      passwordLength <= 8 ? "weak" : passwordLength <= 16 ? "medium" : "strong"
    );
  };

  return (
    <div className="pg-container">
      <h2>Password Generator</h2>
      <ModalClose variant="plain" sx={{ m: 1 }} />
      <div className="pg-wrapper">
        <div className="pg-input-box">
          <input type="text" value={password} readOnly />
          <span className="material-symbols-rounded" onClick={copyPassword}>
            {icval}
          </span>
        </div>
        <div id={passId} className="pg-pass-indicator"></div>
        <div className="pg-pass-length">
          <div className="pg-details">
            <label className="pg-title">Password Length</label>
            <span>{passwordLength}</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={passwordLength}
            onChange={(e) => {
              setPasswordLength(e.target.value);
              generatePassword();
              updatePassIndicator();
            }}
            step="1"
          />
        </div>
        <div className="pg-pass-settings">
          <label className="pg-title">Password Settings</label>
          <ul className="pg-options">
            <li className="pg-option">
              <input
                type="checkbox"
                id="lowercase"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <label htmlFor="lowercase">Lowercase (a-z)</label>
            </li>
            <li className="pg-option">
              <input
                type="checkbox"
                id="uppercase"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <label htmlFor="uppercase">Uppercase (A-Z)</label>
            </li>
            <li className="pg-option">
              <input
                type="checkbox"
                id="numbers"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <label htmlFor="numbers">Numbers (0-9)</label>
            </li>
            <li className="pg-option">
              <input
                type="checkbox"
                id="symbols"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <label htmlFor="symbols">Symbols (!-$^+)</label>
            </li>
            <li className="pg-option">
              <input
                type="checkbox"
                id="exc-duplicate"
                checked={excludeDuplicate}
                onChange={(e) => setExcludeDuplicate(e.target.checked)}
              />
              <label htmlFor="exc-duplicate">Exclude Duplicate</label>
            </li>
          </ul>
        </div>
        <button className="pg-generate-btn" onClick={()=>{
          generatePassword()
          updatePassIndicator()
          }}>
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
