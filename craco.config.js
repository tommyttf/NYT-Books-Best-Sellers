const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.output.libraryTarget = 'umd';

        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
        };

        if (process.argv.includes('--analyze')) {
          webpackConfig.plugins.push(new BundleAnalyzerPlugin());
        }
      }
      return webpackConfig;
    },
  },
};
