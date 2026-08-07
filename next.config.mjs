/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  async headers() {
    const noStaleRoutes = [
      "/",
      "/about/",
      "/classes/",
      "/gallery/",
      "/workshops/",
      "/registration/",
      "/contact/",
      "/admin/",
      "/admin/:path*"
    ];

    return noStaleRoutes.map((source) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: "no-store, no-cache, must-revalidate, max-age=0"
        }
      ]
    }));
  }
};

export default nextConfig;
