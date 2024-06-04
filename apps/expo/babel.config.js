module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            // For development, we want to alias the library to the source
            // [rootPak.name]: path.join(root, rootPak['react-native']),
            // [appPak.name]: path.join(app, appPak['react-native']),
          },
        },
      ],
    ],
  };
};
