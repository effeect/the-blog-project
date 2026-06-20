import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  // The /posts list page reads the markdown directory with fs at request time.
  // Explicitly trace the posts/ folder so it ships with the serverless function
  // on Vercel (a dynamically read directory isn't reliably traced otherwise).
  outputFileTracingIncludes: {
    "/posts": ["./posts/**/*"],
  },
};

export default nextConfig;
