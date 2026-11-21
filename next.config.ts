import type { NextConfig } from "next";

// Static export: `next build` writes a fully static site to ./out that
// Nginx can serve directly. No Node.js runtime is needed in production.
const nextConfig: NextConfig = {
  output: "export",
  // Emit /projects/zushh/index.html so every route resolves as a directory
  // and works when opened directly or refreshed on a plain file server.
  trailingSlash: true,
  // No image server in a static export: a custom loader picks pre-built
  // -320/-480 WebP variants (scripts/make-variants.mjs) for small screens.
  images: {
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
    deviceSizes: [320, 480, 640, 828, 1080, 1440, 1920],
    imageSizes: [64, 128, 256],
  },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
