const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPrefresh = require('@prefresh/next');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const DefinePlugin = require('webpack').DefinePlugin;
require('dotenv').config();

const DEBUG = process.env.DEBUG;
const packageJson = require('./package.json');
const SUPPORTED_LOCALES = ['en', 'de', 'ja'];

module.exports = withPlugins(
  [
    [
      withBundleAnalyzer,
      {
        analyzeBrowser: process.env.BUNDLE_ANALYZE === 'browser',
        bundleAnalyzerConfig: {
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
        inlineImageLimit: 5000,
      },
    ],
    [withPrefresh]
  ],
  {
    // Further customizations of webpack config:
    distDir: '../build/.next',
    env: {
      DEBUG
    },
    webpack(config, options) {

      if (options.isServer) {
        config.externals = ['react', 'react-dom', 'react-ssr-prepass', ...config.externals]
      }

      // Alias react with Preact
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': "preact/compat",
        'react$': "preact/compat",
        "react-dom": "preact/compat",
        'react-dom$': 'preact/compat',
        "react-ssr-prepass": "preact-ssr-prepass",
      };

      config.plugins.push(new LodashModuleReplacementPlugin());

      // Push DotEnv vars into client code
      config.plugins.push(
        new Dotenv({
          systemvars: true,
        })
      );

      config.plugins.push(
        new DefinePlugin({
        'process.env': {
          PACKAGE_HOMEPAGE: `"${packageJson.homepage}"`,
          PACKAGE_VERSION: `"${packageJson.version}"`
        }
      }));

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

      return config;
    },
    experimental: {
      modern: true,
    },
    exportTrailingSlash: false,
    /**
     * Generate language specific pages under /[locale]/... paths e.g:
     * /de/ leads to the the German landing page
     * /de/block leads to the German block page etc.
     *
     * @param defaultPathMap
     * @returns {Promise<{}>}
     */
    exportPathMap: async function(defaultPathMap) {
      const pathMap = {};
      Object.entries(defaultPathMap).forEach(([key, value]) => {
        // Only generate language specific paths for localized routes
        if (!key.includes('[locale]')) {
          pathMap[key] = value;
          return;
        }
        SUPPORTED_LOCALES.forEach(locale => {
          pathMap[`${key.replace('[locale]', locale)}`] = { ...value, query: { locale } };
        });
      });
      return pathMap;
    },
  },
);
