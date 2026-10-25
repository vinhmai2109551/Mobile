module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-worklets/plugin'], // bắt buộc cho react-native-reanimated, phải đặt CUỐI CÙNG
  };
};
