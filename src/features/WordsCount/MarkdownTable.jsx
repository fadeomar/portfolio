import { useState, useEffect } from "react";
function analyzeString(inputString) {
  // Step 1: Split the input string into an array of words
  const words = inputString.split(/\s+/);

  // Step 2: Count the occurrences of each word using an object
  const wordCounts = {};
  words.forEach((word) => {
    if (wordCounts[word]) {
      wordCounts[word]++;
    } else {
      wordCounts[word] = 1;
    }
  });

  // Step 3: Calculate the total word count
  const totalWordCount = words.length;

  // Step 4: Calculate the percentage for each word
  const wordData = [];
  for (const word in wordCounts) {
    const count = wordCounts[word];
    const percentage = ((count / totalWordCount) * 100).toFixed(2) + "%";
    wordData.push({ word, count, percentage });
  }

  return wordData;
}

const MarkdownTable = ({ text = "" }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const arr = analyzeString(text);
    setData(arr);
  }, [text]);
  return (
    <table className="WC_table">
      <thead>
        <tr>
          <th className="WC_th">Word</th>
          <th className="WC_th">Count</th>
          <th className="WC_th">%</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="WC_td">{item.word}</td>
            <td className="WC_td">{item.count}</td>
            <td className="WC_td">{item.percentage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MarkdownTable;
