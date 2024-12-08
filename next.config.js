/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Optimize image loading
  images: {
    domains: ['plotly.com'], // Add domains for external images
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle binary files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });

    // Ignore canvas module
    config.resolve.alias.canvas = false;
    
    // Handle canvas.node
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
      exclude: /canvas\.node$/
    });

    return config;
  },
}

module.exports = nextConfig
