import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api' :{
        target:'http://localhost:3000',
        secure:false,
      },
    },
  },
  resolve: {
    alias: {
      buffer: 'buffer/', // Use the buffer polyfill in the browser
    },
  },
  optimizeDeps: {
    include: ['buffer'], // Make sure buffer is included in the optimization
  },
  plugins: [react()],
  
});
