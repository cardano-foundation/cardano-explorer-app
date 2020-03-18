const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const DEBUG = process.env.DEBUG;
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
  ],
  {
    // Further customizations of webpack config:
    distDir: '../build/.next',
    env: {
      DEBUG
    },
    webpack(config) {

      config.plugins.push(new LodashModuleReplacementPlugin());

      // Push DotEnv vars into client code
      config.plugins.push(
        new Dotenv({
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

      // Preact optimizations
      const splitChunks = config.optimization && config.optimization.splitChunks
      if (splitChunks) {
        const cacheGroups = splitChunks.cacheGroups;
        const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string)[\\/]/;
        if (cacheGroups.framework) {
          cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
            test: preactModules
          });
          cacheGroups.commons.name = 'framework';
        }
        else {
          cacheGroups.preact = {
            name: 'commons',
            chunks: 'all',
            test: preactModules
          };
        }
      }

      return config;
    },
    experimental: {
      modern: true,
      polyfillsOptimization: true
    },
    exportTrailingSlash: true,
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
