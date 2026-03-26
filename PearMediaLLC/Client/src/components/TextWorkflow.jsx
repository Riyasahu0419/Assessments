import React, { useState } from "react";
import { enhanceText, generateImage } from "../services/api";

function TextWorkflow({ setEnhancedText, setImage }) {
  const [prompt, setPrompt] = useState("");
  const [localEnhanced, setLocalEnhanced] = useState("");

  const handleEnhance = async () => {
    try {
      const res = await enhanceText(prompt);
      console.log(res)
      setLocalEnhanced(res.data.enhanced);
      setEnhancedText(res.data.enhanced);
    } catch (err) {
      alert("Error enhancing text");
    }
  };

  const handleGenerate = async () => {
    try {
      const res = await generateImage(localEnhanced);
      console.log(res)
      setImage(res.data.image);
    } catch (err) {
      alert("Error generating image");
    }
  };

  return (
    <div className="card">
      <h2>Text Workflow</h2>

      <input
        type="text"
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleEnhance}>Enhance Prompt</button>

      {localEnhanced && (
        <>
          <p><strong>Enhanced:</strong> {localEnhanced}</p>
          <button onClick={handleGenerate}>Generate Image</button>
        </>
      )}
    </div>
  );
}

export default TextWorkflow;