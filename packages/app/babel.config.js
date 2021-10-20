module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            components: './app/components',
            constant: './app/constant',
            ducks: './app/ducks',
            interfaces: './app/interfaces',
            navigation: './app/navigation',
            style: './app/style',
            utils: './app/utils',
          },
        },
      ],
    ],
  };
};
