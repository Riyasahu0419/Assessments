import React from "react";

function ResultDisplay({ enhancedText, image, analysis }) {
  // ✅ Don't render the card at all if there's nothing to show
  if (!enhancedText && !analysis && !image) return null;

  return (
    <div className="card">
      <h2>Results</h2>

      {enhancedText && (
        <p><strong>Enhanced Prompt:</strong> {enhancedText}</p>
      )}

      {analysis && (
        <p><strong>Image Analysis:</strong> {analysis}</p>
      )}

      {image && (
        <div>
          <img
            src={image}
            alt="Generated"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
          {/* ✅ Download button so user can save the generated image */}
          <div style={{ marginTop: "8px" }}>
            <a href={image} download="generated.png">
              <button>Download Image</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;