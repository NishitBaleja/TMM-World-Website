import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.resolve("public/images");
const WEBP_QUALITY = 75;
const JPEG_QUALITY = 80;
const MAX_WIDTH = 2000;
const MIN_SIZE = 10 * 1024; // skip files under 10KB

const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp"];

let savedTotal = 0;
let processedCount = 0;
let skippedCount = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!SUPPORTED.includes(ext)) continue;

      const stats = fs.statSync(fullPath);
      if (stats.size < MIN_SIZE) {
        skippedCount++;
        continue;
      }

      processImage(fullPath, ext);
    }
  }
}

async function processImage(filePath, ext) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image;

    // Resize if wider than max
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    // Determine output format and compression
    const outFormat = ext === ".jpg" || ext === ".jpeg" ? "jpeg" : ext === ".png" ? "png" : "webp";

    const opts = {};
    if (outFormat === "jpeg") {
      opts.quality = JPEG_QUALITY;
      opts.mozjpeg = true;
    } else if (outFormat === "webp") {
      opts.quality = WEBP_QUALITY;
      opts.smartSubsample = true;
    } else if (outFormat === "png") {
      opts.compressionLevel = 9;
      opts.palette = true;
    }

    const beforeSize = fs.statSync(filePath).size;
    const tempPath = filePath + ".tmp";

    await pipeline[outFormat](opts).toFile(tempPath);
    const afterSize = fs.statSync(tempPath).size;

    if (afterSize < beforeSize) {
      fs.copyFileSync(tempPath, filePath);
      const saved = beforeSize - afterSize;
      savedTotal += saved;
      processedCount++;
      const beforeKB = (beforeSize / 1024).toFixed(0);
      const afterKB = (afterSize / 1024).toFixed(0);
      const pct = ((1 - afterSize / beforeSize) * 100).toFixed(0);
      console.log(`  ✓ ${path.basename(filePath)}: ${beforeKB}KB → ${afterKB}KB (-${pct}%)`);
    } else {
      skippedCount++;
    }

    fs.unlinkSync(tempPath);
  } catch (err) {
    console.error(`  ✗ Error processing ${path.basename(filePath)}: ${err.message}`);
  }
}

console.log("Optimizing images in", IMAGES_DIR);
console.log("");

walk(IMAGES_DIR);

console.log("");
console.log(`Done. Processed: ${processedCount}, Skipped: ${skippedCount}, Total saved: ${(savedTotal / 1024 / 1024).toFixed(2)}MB`);
