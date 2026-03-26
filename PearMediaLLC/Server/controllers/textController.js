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
      console.log("RAW RESPONSE:", text);
      throw new Error(text);
    }

    console.log("HF TEXT:", data);

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