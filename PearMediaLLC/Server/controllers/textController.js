export const enhanceText = async (req, res) => {
  try {
    const { prompt } = req.body;

   const response = await fetch(
  "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Rewrite this as a detailed image prompt: ${prompt}`,
          options: { wait_for_model: true }
        }),
      }
    );

    const contentType = response.headers.get("content-type");

    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      // console.log("RAW RESPONSE:", text);
      throw new Error(text);
    }

    // console.log("HF TEXT:", data);

    let enhancedText = "";

    if (Array.isArray(data)) {
      enhancedText = data[0]?.generated_text;
    } else if (data.error) {
      enhancedText = "Error: " + data.error;
    }

    res.json({
      enhanced: enhancedText || "No response",
    });

  } catch (err) {
    console.error("SERVER ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};




// // ✅ No import needed — fetch is global in Node 18+
// import dotenv from "dotenv";
// dotenv.config();

// export const enhanceText = async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await fetch(
//       "https://router.huggingface.co/hf-inference/models/google/flan-t5-base",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: `Rewrite this as a detailed image prompt: ${prompt}`,
//           options: { wait_for_model: true },
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       console.error("HF TEXT ERROR:", errorData);
//       return res.status(502).json({
//         error: errorData.error || `HuggingFace returned ${response.status}`,
//       });
//     }

//     const contentType = response.headers.get("content-type") || "";

//     if (!contentType.includes("application/json")) {
//       const text = await response.text();
//       console.error("RAW RESPONSE:", text);
//       return res.status(502).json({ error: "Unexpected response from HuggingFace" });
//     }

//     const data = await response.json();
//     console.log("HF TEXT:", data);

//     let enhancedText = "";
//     if (Array.isArray(data)) {
//       enhancedText = data[0]?.generated_text;
//     } else if (data.error) {
//       enhancedText = "Error: " + data.error;
//     }

//     res.json({ enhanced: enhancedText || "No response" });

//   } catch (err) {
//     console.error("SERVER ERROR:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };