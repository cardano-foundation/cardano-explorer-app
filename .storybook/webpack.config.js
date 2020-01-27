const isCi = process.env.CI && process.env.CI !== '';

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
  }, {
    test: /\.scss/,
      use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: !isCi,
          modules: true,
          importLoaders: true,
        },
      },
      { loader: 'sass-loader', options: { sourceMap: !isCi } },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
