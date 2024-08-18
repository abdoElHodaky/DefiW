// craco.config.js
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

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
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      webpackConfig['resolve'] = {
        fallback: {
           assert: false,
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
            url:require.resolve('url'),
            buffer:false,
            vm:false,
            //util:require.resolve('util')
        },
      }
      return webpackConfig;
    },
  },
/*  webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve.fallback = {
                crypto: require.resolve('crypto-browserify'),
                buffer: require.resolve('buffer/'),
                stream: require.resolve('stream-browserify'),
                https: require.resolve('https-browserify'),
                os: require.resolve('os-browserify/browser'),
                http: require.resolve('stream-http'),
                assert:require.resolve("assert/"),
               // "process/browser": require.resolve('process/browser'),
           
            };
            webpackConfig.plugins = [
                ...webpackConfig.plugins,
               /* new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ["buffer", "Buffer"],
                }),*/
             /*  new NodePolyfillPlugin({
		        	 additionalAliases: ['process', 'buffer'],
	           	}),
              
            ];
            return webpackConfig;
        },
    },*/
}
