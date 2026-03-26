import React, { useState } from "react";
import TextWorkflow from "./components/TextWorkflow";
import ImageWorkflow from "./components/ImageWorkflow";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [enhancedText, setEnhancedText] = useState("");
  const [image, setImage] = useState("");
  const [analysis, setAnalysis] = useState("");

  return (
    <div className="container">
      <h1>AI Image & Text Generator</h1>

      <TextWorkflow
        setEnhancedText={setEnhancedText}
        setImage={setImage}
      />

      <ImageWorkflow
        setAnalysis={setAnalysis}
        setImage={setImage}
      />

      <ResultDisplay
        enhancedText={enhancedText}
        image={image}
        analysis={analysis}
      />
    </div>
  );
}

export default App;