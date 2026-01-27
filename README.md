
# AuraForensics - AI Detection Lab

A high-end digital forensics tool designed to analyze images and videos for signs of AI generation and deepfakes.

## Deployment Instructions

### 1. Requirements
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey).
- A [Vercel](https://vercel.com) or [Netlify](https://netlify.com) account.

### 2. Step-by-Step Deployment (Vercel)
1. **Upload Code**: Push this directory to a new GitHub repository.
2. **Import Project**: Log into Vercel, click "Add New", and select your repository.
3. **Environment Variables**:
   - Go to the **Environment Variables** section during setup.
   - Add a key named `API_KEY`.
   - Paste your Gemini API key as the value.
4. **Deploy**: Click the deploy button.

### 3. Local Development
To run this locally, ensure you have a development environment that supports ES modules and environment variables.
```bash
# Example if using Vite
npm install
npm run dev
```

## Security Note
This app uses `process.env.API_KEY`. For high-traffic production environments, it is recommended to move the API calls to a server-side proxy (like Vercel Edge Functions) to hide the API key from the client-side network tab.
