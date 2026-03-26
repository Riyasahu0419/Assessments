import React from "react";

function ResultDisplay({ enhancedText, image, analysis }) {
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
          <img src={image} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;