/** @type {import('next').NextConfig} */
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ["markdown"],
      }),
    );
    return config;
  },
};

module.exports = nextConfig;
