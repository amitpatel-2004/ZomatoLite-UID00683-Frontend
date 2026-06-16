import 'webpack-dev-server';

import webpack from 'webpack';

import commonConfig from './webpack.common.ts';

const devConfig: webpack.Configuration = {
  ...commonConfig,

  mode: 'development',

  output: {
    ...commonConfig.output,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  devServer: {
    open: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      ...(commonConfig.module?.rules || []),
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
