// craco.config.js
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const imageOptimizer = require('craco-image-optimizer-plugin');


module.exports = {
 plugins:[
  {
      plugin: imageOptimizer,
      // image-webpack-plugin options
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65,
        },
	optipng: {
          enabled: true,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75,
        },
      },
    },
 ],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
	require('cssnano')
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
