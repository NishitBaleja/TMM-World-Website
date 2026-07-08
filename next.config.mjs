/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    deviceSizes: [480, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
