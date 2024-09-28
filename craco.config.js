// craco.config.js
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const SingleSpaAppcracoPlugin = require('craco-plugin-single-spa-application');

module.exports = {
 plugins:[
  {
  plugin: SingleSpaAppcracoPlugin,
  options: {
    orgName: "my-org",
    projectName: "defiw-app",
    entry: "src/index.js", //defaults to src/index.js,
    orgPackagesAsExternal: false, // defaults to false. marks packages that has @my-org prefix as external so they are not included in the bundle
    reactPackagesAsExternal: true, // defaults to true. marks react and react-dom as external so they are not included in the bundle
    minimize: true, // defaults to false, sets optimization.minimize value
    outputFilename: "build/defiw-spa.js" // defaults to the values set for the "orgName" and "projectName" properties, in this case "my-org-my-app.js"
  },
  }
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
	    webpackConfig.optimization.minimize = true;
            webpackConfig.optimization.minimizer.push(
            new ImageMinimizerPlugin({
             minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [["mozjpeg", { quality: 85 }]],
             },
           },
           generator: [
            {
              preset: "webp",
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                plugins: [
                  "imagemin-webp",
                  "imagemin-pngquant",
                  "imagemin-svgo",
                ],
              },
            },
          ],
        })
      );
            return webpackConfig;
        },
    },
}
