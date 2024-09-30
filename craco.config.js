// craco.config.js
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
 plugins:[
  {
 /* plugin: SingleSpaAppcracoPlugin,
  options: {
    orgName: "my-org",
    projectName: "defiw-app",
    entry: "src/index.js", //defaults to src/index.js,
    orgPackagesAsExternal: false, // defaults to false. marks packages that has @my-org prefix as external so they are not included in the bundle
    reactPackagesAsExternal: true, // defaults to true. marks react and react-dom as external so they are not included in the bundle
    minimize: false, // defaults to false, sets optimization.minimize value
    outputFilename: "defiw-spa.js" // defaults to the values set for the "orgName" and "projectName" properties, in this case "my-org-my-app.js"
  },
  }*/
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
              new GenerateSW({
	mode:"development",
	directoryIndex: 'public/',
        exclude: [
          /\.(?:png|jpg|jpeg|svg)$/,
          // Ignore the mix.js that's being generated 
          
      ],
	//navigateFallback:"/offline.html",
	runtimeCaching: [
    {
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

              // Apply a cache-first strategy.
        handler: 'CacheFirst',
        options: {
                  // Use a custom cache name.
          cacheName: 'images',
          expiration: {
            maxEntries: 20,
	        maxAgeSeconds: 2 * 24 * 60 * 60,
          }
        }
    },
    {
    urlPattern:/*"https://cdn.*.com/**" */({request, url}) =>url.includes("cdn")==true,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'cdns',
      expiration: {
        maxEntries: 20,
	maxAgeSeconds: 2 * 24 * 60 * 60,
      },
      cacheableResponse:{
	statuses: [0, 200]
      }
    },
  },{
    urlPattern: ({request, url}) => request.method.toLowerCase()=="post",
    handler:"NetworkOnly",
    method:"POST",
    options:{
      cacheName:"apCachePost",
      cacheableResponse:{
	statuses: [0, 200]
      },
      backgroundSync:{
       name:"Apisync",
       options:{
    	maxRetentionTime:24*60*2
       }
      }
    }
  },{
    urlPattern:/*"https://fonts.*.com/**"*/ ({request, url}) =>url.includes("fonts")==true,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'cdns',
      expiration: {
        maxEntries: 20,
	maxAgeSeconds: 2 * 24 * 60 * 60,
      },
      cacheableResponse:{
	statuses: [0, 200]
      }
    }
  }],
   swDest: 'sw.js',  
    skipWaiting: true,
    clientsClaim: true,
	      })
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
