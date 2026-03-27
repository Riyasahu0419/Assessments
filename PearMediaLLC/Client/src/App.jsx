// import React, { useState } from "react";
// import TextWorkflow from "./components/TextWorkflow";
// import ImageWorkflow from "./components/ImageWorkflow";
// import ResultDisplay from "./components/ResultDisplay";

// function App() {
//   const [enhancedText, setEnhancedText] = useState("");
//   const [image, setImage] = useState("");
//   const [analysis, setAnalysis] = useState("");

//   return (
//     <div className="container">
//       <h1>AI Image & Text Generator</h1>

//       <TextWorkflow
//         setEnhancedText={setEnhancedText}
//         setImage={setImage}
//       />

//       <ImageWorkflow
//         setAnalysis={setAnalysis}
//         setImage={setImage}
//       />

//       <ResultDisplay
//         enhancedText={enhancedText}
//         image={image}
//         analysis={analysis}
//       />
//     </div>
//   );
// }

// export default App;








import React, { useState } from "react";
import TextWorkflow from "./components/TextWorkflow";
import ImageWorkflow from "./components/ImageWorkflow";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [enhancedText, setEnhancedText] = useState("");
  const [image, setImage] = useState("");
  const [analysis, setAnalysis] = useState("");

  // ✅ Single reset handler to clear all results between workflows
  const handleReset = () => {
    setEnhancedText("");
    setImage("");
    setAnalysis("");
  };

  return (
    <div className="container">
      <h1>AI Image &amp; Text Generator</h1>

      <TextWorkflow
        setEnhancedText={setEnhancedText}
        setImage={setImage}
      />

      <ImageWorkflow
        setAnalysis={setAnalysis}
        setImage={setImage}
      />

      {/* ✅ Reset button clears stale results when switching workflows */}
      {(enhancedText || image || analysis) && (
        <div style={{ textAlign: "right", marginBottom: "8px" }}>
          <button onClick={handleReset} style={{ opacity: 0.6 }}>
            Clear Results
          </button>
        </div>
      )}

      <ResultDisplay
        enhancedText={enhancedText}
        image={image}
        analysis={analysis}
      />
    </div>
  );
}

export default App;