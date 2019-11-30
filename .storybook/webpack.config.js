const path = require('path');
const isCi = process.env.CI && process.env.CI !== '';

let themeResource = 'incentivized-testnet';
const resourcesDir = path.join(__dirname, '..','source/styles/resources');
const resources = [
  `${resourcesDir}/mixins/**/*.scss`,
  `${resourcesDir}/variables-common/**/*.scss`,
  `${resourcesDir}/variables-themes/variables-theme-${themeResource}.scss`,
];

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
          localIdentName: '[name]_[local]',
          importLoaders: true,
        },
      },
      { loader: 'fast-sass-loader', options: { sourceMap: !isCi } },
      { loader: 'sass-resources-loader', options: { resources } },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
