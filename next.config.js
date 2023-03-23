/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   swcMinify: true,
   images: {
      domains: ["media.tenor.com"],
   },
};

module.exports = nextConfig;
