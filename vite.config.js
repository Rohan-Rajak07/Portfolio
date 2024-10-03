import { defineConfig } from 'vite';

// export default defineConfig({
//   base: '/Portfolio/',
// });
export default defineConfig({
    base: '/Portfolio/',
    build: {
        chunkSizeWarningLimit: 1000 // Set to 1000 kB, or any size you're comfortable with
      }
  });
