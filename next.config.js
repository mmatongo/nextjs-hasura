/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  },
};

module.exports = nextConfig;
