const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Disable gzip/brotli compression plugins to debug CRC errors
  config.plugins = config.plugins.filter(
    (p) => p.constructor && p.constructor.name !== 'CompressionPlugin'
  );

  return config;
};
