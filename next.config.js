const path = require('path');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const resourcesDirectory = path.join(__dirname, './source/styles/variables.scss');
const resourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [resourcesDirectory]
  }
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
        webpack(config, options) {
          config.module.rules.map(rule => {
            if (
              rule.test.source.includes("scss") ||
              rule.test.source.includes("sass")
            ) {
              const notAdded = rule.use.reduce((added, u) => {
                if (!added || (u && u.loader === 'sass-resources-loader')) return false;
                return true
              }, true);
              if (notAdded)
                rule.use.push(resourcesLoader);
            }
          });
          return config;
        }
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
      return config;
    },
  }
);
