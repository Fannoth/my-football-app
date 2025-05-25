module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env.local',
          safe: false,
          allowUndefined: false,
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '^react-native$': 'react-native',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
