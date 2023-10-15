/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    domains: ["i.ibb.co", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
