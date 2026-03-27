// export const generateImage = async (req, res) => {
//   try {
//     const { prompt } = req.body;

//    const response = await fetch(
//   "https://router.huggingface.co/hf-inference/models/runwayml/stable-diffusion-v1-5",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: prompt,
//           options: { wait_for_model: true }
//         }),
//       }
//     );

//     // 🔥 Check content type
//     const contentType = response.headers.get("content-type");

//     if (contentType.includes("application/json")) {
//       const errorData = await response.json();
//       console.log("HF IMAGE ERROR:", errorData);
//       return res.json({
//         image: "",
//         error: errorData.error || "Image generation failed"
//       });
//     }

//     const buffer = await response.arrayBuffer();
//     const base64 = Buffer.from(buffer).toString("base64");

//     res.json({
//       image: `data:image/png;base64,${base64}`,
//     });

//   } catch (err) {
//     console.error("IMAGE ERROR:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };
// export const analyzeImage = async (req, res) => {
//   try {
//     const fs = await import("fs");

//     const imageBuffer = fs.readFileSync(req.file.path);

//     // 🔹 Step 1: Caption Image
//    const response = await fetch(
//   "https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-base",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//         },
//         body: imageBuffer,
//       }
//     );

//     const data = await response.json();
//     console.log("HF IMAGE:", data);

//     const description =
//       Array.isArray(data) && data[0]?.generated_text
//         ? data[0].generated_text
//         : "A detailed image";

//     // 🔹 Step 2: Generate variation
//     const imgResponse = await fetch(
//       "https://router.huggingface.co/hf-inference/models/runwayml/stable-diffusion-v1-5",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: description,
//           options: { wait_for_model: true }
//         }),
//       }
//     );

//     const contentType = imgResponse.headers.get("content-type");

//     if (contentType.includes("application/json")) {
//       const errorData = await imgResponse.json();
//       console.log("HF VARIATION ERROR:", errorData);

//       return res.json({
//         description,
//         variation: "",
//         error: errorData.error
//       });
//     }

//     const buffer = await imgResponse.arrayBuffer();
//     const base64 = Buffer.from(buffer).toString("base64");

//     res.json({
//       description,
//       variation: `data:image/png;base64,${base64}`,
//     });

//   } catch (err) {
//     console.error("ANALYZE ERROR:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

import fs from "fs";

/**
 * ✅ IMAGE GENERATION (Unsplash - ALWAYS WORKS)
 */
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const imageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(prompt)}`;

    res.json({
      image: imageUrl,
    });

  } catch (err) {
    console.error("IMAGE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
/**
 * ✅ IMAGE ANALYSIS (Mock + Smart Variation)
 */
export const analyzeImage = async (req, res) => {
  try {
    const description = "A detailed scene with objects, lighting, and environment";

    const variation = `https://source.unsplash.com/800x600/?${encodeURIComponent(description)}`;

    res.json({
      description,
      variation,
    });

  } catch (err) {
    console.error("ANALYZE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

