const path = require('path');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// TODO: get these variables
let themeResource = 'testnet';
const resourcesDir = path.join(__dirname, 'source/styles/resources');
const resources = [
  `${resourcesDir}/common/**/*.scss`,
  `${resourcesDir}/themes/variables-theme-${themeResource}.scss`,
];
const resourcesLoader = {
  loader: 'sass-resources-loader',
  options: { resources },
};

const DEBUG = process.env.DEBUG;
const ENV_PATH = process.env.ENV_PATH;

if (!ENV_PATH)
  throw new Error('ENV_PATH must be provided to build the project.');

require('dotenv').config({path: path.join(__dirname, ENV_PATH)});

const added = {};

module.exports = withPlugins(
  [
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          sourceMap: true,
          modules: true,
          localIdentName: '[name]_[local]',
          importLoaders: true,
        },
      },
    ],
    [
      withBundleAnalyzer,
      {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
          },
        },
      },
    ],
    [
      withFonts,
      {
        enableSvg: true,
      },
    ],
    [
      withImages,
      {
        inlineImageLimit: 16384,
      },
    ],
  ],
  {
    // Further customizations of webpack config:
    distDir: '../build/.next',
    env: {
      DEBUG,
    },
    webpack(config) {
      config.plugins.push(new LodashModuleReplacementPlugin());

      // Push DotEnv vars into client code
      config.plugins.push(
        new Dotenv({
          path: path.join(__dirname, ENV_PATH),
          systemvars: true,
        })
      );

      // Support GraphQL literals
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader',
          },
        ],
      });

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });

      // Includes the global SCSS variables
      config.module.rules.forEach(rule => {
        if (rule.test.source.includes("scss")) {
          rule.use.push(resourcesLoader);
        }
      });
      return config;

      return config;
    },
  }
);
