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
      DEBUG
    },
    experimental: {
      css: true,
      scss: true
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

      return config;
    },
    exportTrailingSlash: true,
    /**
     * Generate language specific pages under /$language/... paths e.g:
     * /de/ leads to the the German landing page
     * /de/block leads to the German block page etc.
     *
     * @param defaultPathMap
     * @returns {Promise<{}>}
     */
    exportPathMap: async function(defaultPathMap) {
      const pathMap = {};
      Object.entries(defaultPathMap).forEach(([key, value]) => {
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
