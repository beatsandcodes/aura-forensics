
# AuraForensics - AI Detection Lab

A high-end digital forensics tool designed to analyze images and videos for signs of AI generation and deepfakes.

## Deployment Instructions

### . Local Development
To run this locally, ensure you have a development environment that supports ES modules and environment variables.
```bash
# Example if using Vite
npm install
npm run dev
```

## Security Note
This app uses `process.env.API_KEY`. For high-traffic production environments, it is recommended to move the API calls to a server-side proxy (like Vercel Edge Functions) to hide the API key from the client-side network tab.
