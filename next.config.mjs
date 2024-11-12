/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'www.notion.so'],
  },
  env: {
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
  },
};

export default nextConfig;
