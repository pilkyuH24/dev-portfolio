const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.notion.so",
      "images.unsplash.com",
      "s3.us-west-2.amazonaws.com",
    ],
    formats: ["image/avif", "image/webp", "image/png", "image/jpeg"],
  },
};

export default nextConfig;
