import type { NextConfig } from "next";

// Static export: `next build` writes a fully static site to ./out that
// Nginx can serve directly. No Node.js runtime is needed in production.
const nextConfig: NextConfig = {
  output: "export",
  // Emit /projects/zushh/index.html so every route resolves as a directory
  // and works when opened directly or refreshed on a plain file server.
  trailingSlash: true,
  images: { unoptimized: true },
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
