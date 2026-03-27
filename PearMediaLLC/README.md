# AI Image & Text Generator

## What it does

**Text Workflow**
- Type a prompt
- It gets enhanced using flan-t5 (Hugging Face)
- Then generates an image from Unsplash based on the enhanced prompt

**Image Workflow**
- Upload any image
- A mock caption is generated describing the scene
- Then a related image is fetched from Unsplash based on that caption

## Tech Stack

- React + Vite
- Node.js + Express
- Hugging Face API (flan-t5 for text enhancement only)
- Unsplash (image generation and variation)
- Multer

## Note on Image Generation

Stable Diffusion and BLIP via Hugging Face were attempted but the API URLs are not supported in the current environment. Image generation and image variation now use Unsplash as a reliable fallback.

## Setup

Install dependencies:

```bash
cd Server && npm install
cd ../Client && npm install
```

Add your key in `Server/.env`:

```
HF_API_KEY=your_huggingface_api_key
```

Start backend:

```bash
cd Server
npm run dev
```

Start frontend:

```bash
cd Client
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Endpoints

| Method | Endpoint | What it does |
|--------|----------|--------------|
| POST | `/api/text/enhance` | Enhance a prompt using flan-t5 (Hugging Face) |
| POST | `/api/image/generate` | Generate image from prompt via Unsplash |
| POST | `/api/image/analyze` | Returns a mock caption + Unsplash variation image |
