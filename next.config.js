const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins = [
      ...config.plugins,
      new CopyWebpackPlugin({
        patterns: [
          {from: "node_modules/pdfjs-dist/build/pdf.worker.js", to: "../public/libs/pdfjs-dist/pdf.worker.js" },
          {from: "node_modules/pdfjs-dist/cmaps", to: "../public/libs/pdfjs-dist/cmaps"},
        ]
      }),
    ];
    return config;
  }
}
