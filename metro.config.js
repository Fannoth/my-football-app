// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.sourceExts.push('cjs');

  // This is the new line you should add in, after the previous lines
  config.resolver.unstable_enablePackageExports = false;

  // wymuś, by react/JSX i react-native zawsze były z roota
  config.resolver.extraNodeModules = {
    react: path.resolve(__dirname, 'node_modules/react'),
    'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
  };

  // gdybyś miał paczki z outside-monorepo
  config.watchFolders = [path.resolve(__dirname, 'node_modules')];

  return config;
})();
