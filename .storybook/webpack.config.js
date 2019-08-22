const isCi = process.env.CI && process.env.CI !== '';

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
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
          localIdentName: '[name]_[local]',
          importLoaders: true,
        },
      },
      { loader: 'fast-sass-loader', options: { sourceMap: !isCi } },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
