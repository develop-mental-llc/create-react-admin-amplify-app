const plugins = [];
const presets = [];

/**
 * Presets
 */
presets.push([
  "@babel/preset-env",
  {
    targets: {
      node: "10",
    },
  },
]);
presets.push("@babel/preset-typescript");

/**
 * Plugins
 */

if (process.env.NODE_ENV === "test") {
  // do something if test
}

module.exports = {
  presets,
  plugins,
};
