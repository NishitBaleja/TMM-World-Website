const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_IMAGE = path.join(__dirname, '../public/images/tmm-world-logo.webp');
const PUBLIC_DIR = path.join(__dirname, '../public');

async function main() {
  console.log('Generating favicons from:', SOURCE_IMAGE);

  // Define the sizes we want
  const sizes = [16, 32, 48, 96, 180, 192, 512];
  const pngBuffers = {};

  for (const size of sizes) {
    const buffer = await sharp(SOURCE_IMAGE)
      .resize(size, size)
      .png()
      .toBuffer();
    
    pngBuffers[size] = buffer;
    
    // Save individual files
    let filename;
    if (size === 180) {
      filename = 'apple-icon.png';
    } else {
      filename = `icon-${size}x${size}.png`;
    }
    
    fs.writeFileSync(path.join(PUBLIC_DIR, filename), buffer);
    console.log(`Created: ${filename}`);
  }

  // Create favicon.ico using 16, 32, 48, and 96 size PNGs
  const icoSizes = [16, 32, 48, 96];
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type (1 = ICO)
  header.writeUInt16LE(icoSizes.length, 4); // Number of images

  const directories = [];
  const imageDatas = [];
  let currentOffset = 6 + (16 * icoSizes.length);

  for (const size of icoSizes) {
    const data = pngBuffers[size];
    imageDatas.push(data);

    const dirEntry = Buffer.alloc(16);
    dirEntry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    dirEntry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    dirEntry.writeUInt8(0, 2); // Color palette size
    dirEntry.writeUInt8(0, 3); // Reserved
    dirEntry.writeUInt16LE(1, 4); // Color planes
    dirEntry.writeUInt16LE(32, 6); // Bits per pixel (32-bit since it's PNG with alpha)
    dirEntry.writeUInt32LE(data.length, 8); // Image size
    dirEntry.writeUInt32LE(currentOffset, 12); // Image offset

    directories.push(dirEntry);
    currentOffset += data.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...directories,
    ...imageDatas
  ]);

  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
  console.log('Created: favicon.ico containing 16x16, 32x32, 48x48, and 96x96 PNGs');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
