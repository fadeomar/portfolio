import React, { useRef, useEffect, useState } from "react";
import { SectionWrapper } from "../../hoc";

import "./style.css";
import MarkdownTable from "./MarkdownTable";

const fontSizeOptions = [
  { value: "14px", label: "Small" },
  { value: "16px", label: "Medium" },
  { value: "18px", label: "Large" },
  { value: "20px", label: "XL" },
  { value: "24px", label: "XXL" },
];

const WordsCount = () => {
  const [inputValue, setInputValue] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [selectedFontSize, setSelectedFontSize] = useState("16px");

  const handleFontSizeChange = (e) => {
    setSelectedFontSize(e.target.value);
    // You can perform any actions here based on the selected value
  };

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.filter((word) => word !== "").length;
  };

  const countChars = (text) => {
    return text.length;
  };

  const countLines = (text) => {
    return text.split("\n").length;
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputValue(text);
    const newWordCount = countWords(text);
    const newCharCount = countChars(text);
    const newLineCount = countLines(text);

    // Update counts
    setWordCount(newWordCount);
    setCharCount(newCharCount);
    setLineCount(newLineCount);
  };
  return (
    <div className="WC_container">
      <div className="WC_dropdown_container">
        <label className="WC_label" htmlFor="fontSizeDropdown">
          Select Preferred Font Size:
        </label>
        <select
          className="WC_custom_dropdown"
          id="fontSizeDropdown"
          value={selectedFontSize}
          onChange={handleFontSizeChange}
        >
          {fontSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="markdown_styles" style={{ fontSize: selectedFontSize }}>
        <textarea
          rows={10}
          cols={50}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Start typing..."
        />
        <div className="WC_count_info">
          {" "}
          Words: {wordCount} | Characters: {charCount} | Lines: {lineCount}
        </div>
      </div>
      {/* tabel goes here */}
      <MarkdownTable text={inputValue} />
    </div>
  );
};

export default SectionWrapper(WordsCount, "WordsCount");
