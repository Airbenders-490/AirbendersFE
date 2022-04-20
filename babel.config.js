module.exports = function(api) {
  api.cache(true);
  return {
    plugins:['@babel/plugin-transform-flow-strip-types'],
    presets: ['babel-preset-expo', ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',],
  };
};
