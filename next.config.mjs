/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config, { dev, isServer }) => {
    // For the client side
    if (!isServer) {
      config.performance = {
        maxAssetSize: 1048 * 1048, // Set your preferred threshold in bytes
      };
    }

    return config;
  },
};

export default nextConfig;
