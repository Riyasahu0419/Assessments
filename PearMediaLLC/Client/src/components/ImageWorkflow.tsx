import React, { useState } from "react";
import { analyzeImage } from "../services/api";

function ImageWorkflow({ setAnalysis, setImage }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return alert("Upload an image first");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await analyzeImage(formData);
      // console.log("analyze image", res);
      if (res.data.error) {
        alert("Analysis error: " + res.data.error);
        return;
      }

      setAnalysis(res.data.description);
      setImage(res.data.variation);
    } catch (err) {
      alert(
        "Error analyzing image: " + (err.response?.data?.error || err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Image Workflow</h2>

      {/* Restrict file picker to images only */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ maxWidth: "200px", marginTop: "8px", borderRadius: "8px" }}
        />
      )}

      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Analyzing..." : "Analyze & Generate"}
      </button>
    </div>
  );
}

export default ImageWorkflow;
