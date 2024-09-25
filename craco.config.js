// craco.config.js
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');


module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
        configure: (webpackConfig) => {
	  webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
         /*   webpackConfig.resolve.fallback = {
                crypto: require.resolve('crypto-browserify'),
                buffer: require.resolve('buffer/'),
                stream: require.resolve('stream-browserify'),
                https: require.resolve('https-browserify'),
                os: require.resolve('os-browserify/browser'),
                http: require.resolve('stream-http'),
                assert:require.resolve("assert/"),
               // "process/browser": require.resolve('process/browser'),
           
            };*/
            webpackConfig.plugins = [
                ...webpackConfig.plugins,
               /*new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ["buffer", "Buffer"],
                }),*/
              new NodePolyfillPlugin({
               additionalAliases: ['process', 'Buffer'],
	    }),
              
            ];
            return webpackConfig;
        },
    },
}
