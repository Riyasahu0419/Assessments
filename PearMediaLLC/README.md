# AI Image & Text Generator

## What it does

**Text Workflow**
- Type a prompt
- It gets enhanced using flan-t5
- Then generates an image from it using Stable Diffusion

**Image Workflow**
- Upload any image
- It gets captioned using BLIP
- Then generates a variation based on that caption

## Tech Stack

- React + Vite
- Node.js + Express
- Hugging Face API
- Multer

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
| POST | `/api/text/enhance` | Enhance a prompt |
| POST | `/api/image/generate` | Generate image from prompt |
| POST | `/api/image/analyze` | Upload image, get caption + variation |
