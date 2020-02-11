const isCi = process.env.CI && process.env.CI !== '';
const path = require('path');

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
  }, {
    test: /\.(woff|woff2)$/,
    loaders: ['file-loader'],
    include: path.resolve(__dirname, '../source/public')
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
