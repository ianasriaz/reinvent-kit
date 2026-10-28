import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

// WordPress embed build: relative base, stable filenames, files only.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    outDir: "dist-wp",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/design-kit.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (info) => {
          const name = info.names?.[0] ?? info.name ?? ""
          if (name.endsWith(".css")) return "assets/design-kit.css"
          if (/\.(ttf|otf|woff2?)$/i.test(name)) return "assets/fonts/[name][extname]"
          return "assets/[name][extname]"
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
