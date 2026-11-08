import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(__dirname, "../dist-wp/assets")
const destDir = path.resolve(__dirname, "../../aws-sbg-theme/assets/design-kit")

if (!fs.existsSync(srcDir)) {
  console.error("Source directory not found. Please run npm run build:wp first:", srcDir)
  process.exit(1)
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

fs.cpSync(srcDir, destDir, { recursive: true })
console.log(`Successfully synced assets from ${srcDir} to ${destDir}`)
