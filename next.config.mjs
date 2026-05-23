/** @type {import('next').NextConfig} */

/**
 * Security headers — applied to every response.
 * Tuned for a marketing landing page that loads Unsplash images,
 * Google Fonts, and Vercel Analytics. Tighten further if features
 * change (e.g. drop unsafe-inline once we eliminate inline styles).
 */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // All site imagery is now self-hosted from `public/img/`, so no
    // remote patterns are required. Add entries here if a future
    // section pulls from an external CDN.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
