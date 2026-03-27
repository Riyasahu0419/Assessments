import React, { useState } from "react";
import { enhanceText, generateImage } from "../services/api";

function TextWorkflow({ setEnhancedText, setImage }) {
  const [prompt, setPrompt] = useState("");
  const [localEnhanced, setLocalEnhanced] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!prompt.trim()) return alert("Enter a prompt first");
    setLoading(true);
    // Fix 5: Reset stale enhanced text before new request
    setLocalEnhanced("");
    setEnhancedText("");
    try {
      const res = await enhanceText(prompt);
      // console.log("enhanced text", res);
      setLocalEnhanced(res.data.enhanced);
      setEnhancedText(res.data.enhanced);
    } catch (err) {
      alert(
        "Error enhancing text: " + (err.response?.data?.error || err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!localEnhanced) return alert("Enhance a prompt first");
    setLoading(true);
    try {
      const res = await generateImage(localEnhanced);
      //  console.log("generate image ",res)
      if (res.data.error) return alert("Generation error: " + res.data.error);
      setImage(res.data.image);
    } catch (err) {
      alert(
        "Error generating image: " + (err.response?.data?.error || err.message),
      );
    } finally {
      setLoading(false);
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
      <button onClick={handleEnhance} disabled={loading}>
        {loading ? "Working..." : "Enhance Prompt"}
      </button>
      {localEnhanced && (
        <>
          <p>
            <strong>Enhanced:</strong> {localEnhanced}
          </p>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </>
      )}
    </div>
  );
}

export default TextWorkflow;
