import type { Configuration } from 'webpack';

import 'webpack-dev-server';

const devConfig: Configuration = {
  mode: 'development',

  devServer: {
    open: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

export default devConfig;
