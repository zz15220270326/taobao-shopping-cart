require("@babel/polyfill");

const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

const plugins = [
  // 'babel-plugin-transform-decorators-legacy'
];

module.exports = { presets, plugins };