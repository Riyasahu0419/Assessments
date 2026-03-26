import React, { useState } from "react";
import { analyzeImage } from "../services/api";

function ImageWorkflow({ setAnalysis, setImage }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Upload an image first");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await analyzeImage(formData);
      console.log("image work",res)
      setAnalysis(res.data.description);
      setImage(res.data.variation);
    } catch (err) {
      alert("Error analyzing image");
    }
  };

  return (
    <div className="card">
      <h2>Image Workflow</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Analyze & Generate</button>
    </div>
  );
}

export default ImageWorkflow;