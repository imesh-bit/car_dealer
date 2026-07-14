const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules')],
    silenceDeprecations: ["legacy-js-api", "import", "global-builtin", "color-functions"],
    quietDeps: true,
  },
};

module.exports = nextConfig;
