
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'aura-forensics' with your actual repository name if different
export default defineConfig({
  plugins: [react()],
  base: './', 
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
