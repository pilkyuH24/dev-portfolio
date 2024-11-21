const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.notion.so', 
      'images.unsplash.com', 
      's3.us-west-2.amazonaws.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;