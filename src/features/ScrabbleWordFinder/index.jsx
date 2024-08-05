import React, { useRef, useEffect, useState } from "react";
import { SectionWrapper } from "../../hoc";

import "./style.css";

import { ALL_WORDS_DATA } from "./ALL_WORDS_DATA";

const highlightMatch = (word, query) => {
  const regex = new RegExp(`${query}`, "gi");

  return word.replace(regex, `<span style="color: red;">${query}</span>`);
};

const highlightWords = (words, query) => {
  const filteredWords = words.filter((word) =>
    word.toLowerCase().includes(query.toLowerCase())
  );
  return filteredWords.map((word) => highlightMatch(word, query));
};

const words = ["testable", "attest", "contest", "testing"];
console.log(highlightWords(words, "test"));

function categorizeWords(inputText, wordArray) {
  const userInput = inputText.toLowerCase();
  const categorizedWords = {};

  wordArray.forEach((word) => {
    const lowercaseWord = word.toLowerCase();

    // Check if the word contains the user's input as a substring
    if (lowercaseWord.includes(userInput)) {
      const wordLength = lowercaseWord.length;

      if (!categorizedWords[wordLength]) {
        categorizedWords[wordLength] = [];
      }

      categorizedWords[wordLength].push(lowercaseWord);
    }
  });

  return categorizedWords;
}

const Word = ({ word, query }) => {
  // todo
  // highlight the word background color
  // console.log(highlightWords(words, "test"));

  const highlightWord = highlightWords([word], query);
  return (
    <div
      className="SWF_result_item"
      dangerouslySetInnerHTML={{ __html: highlightWord.join(" ") }}
    />
  );
};
const WordsCount = () => {
  const [wordsData, setWordData] = useState({});
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setWordData(categorizeWords(inputText, ALL_WORDS_DATA));
  };
  const handleInputChange = (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    setInputText(searchText);
  };
  const word_arr = Object.entries(wordsData);
  return (
    <div className="SWF_container">
      <h1>Scrabble Word Finder</h1>
      <form className="SWF_form" onSubmit={handleSubmit}>
        <label htmlFor="scrabbleInput">Enter a word or part of a word:</label>
        <textarea
          className="SWF_input"
          id="scrabbleInput"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your letters..."
        />
        <button type="submit" className="SWF_button">
          submit
        </button>
        <div className="SWF_result">
          <h2>Matching Words:</h2>
          {word_arr?.length &&
            word_arr.map((item) => {
              return (
                <div className="SWF_item_wrapper" key={item[0]}>
                  <div className="SWF_letters_count">
                    {item[0]} Letter words({item[1].length})
                  </div>
                  <div className="SWF_words_wrapper">
                    {item[1].map((word) => (
                      <Word word={word} query={inputText} key={word} />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
};

export default SectionWrapper(WordsCount, "WordsCount");
