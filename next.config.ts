import type { NextConfig } from "next";

/**
 * --- SECURITY HEADERS ---
 * Defence-in-depth applied at the edge for every response.
 * - CSP: strict Content Security Policy, allows Next.js runtime + self images.
 * - Frame/Content-Type/Sniffing locks.
 * - Referrer trimmed to origin, and a minimal Permissions-Policy surface.
 *
 * If a third-party script (analytics, live chat, maps…) is added later, add its
 * origin to the relevant CSP directive below rather than weakening
 * `default-src 'self'`.
 */

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-site",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Pre-IA-restructure service URLs → nested under /services/<slug>.
      {
        source: "/ai-agents",
        destination: "/services/ai-agents",
        permanent: true,
      },
      {
        source: "/ai-automation",
        destination: "/services/ai-automation",
        permanent: true,
      },
      {
        source: "/workflow-automation",
        destination: "/services/n8n-automation",
        permanent: true,
      },
      {
        source: "/ai-integrations",
        destination: "/services/ai-integrations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
