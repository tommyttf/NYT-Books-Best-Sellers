const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.output.libraryTarget = 'umd';
        if (process.argv.includes('--platform=netlify')) {
          webpackConfig.output.publicPath = '/';
        } else {
          webpackConfig.output.publicPath = '/NYT-Books-Best-Sellers';
        }

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
