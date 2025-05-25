// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.sourceExts.push('cjs');

  config.resolver.unstable_enablePackageExports = false;

  config.resolver.extraNodeModules = {
    react: path.resolve(__dirname, 'node_modules/react'),
    'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
  };

  config.watchFolders = [path.resolve(__dirname, 'node_modules')];

  return config;
})();
