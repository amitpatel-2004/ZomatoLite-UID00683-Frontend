import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

import commonConfig from './webpack.common.ts';

const prodConfig: webpack.Configuration = {
  ...commonConfig,

  mode: 'production',

  output: {
    ...commonConfig.output,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },

  plugins: [
    ...(commonConfig.plugins || []),
    new MiniCssExtractPlugin(),
    new WorkboxWebpackPlugin.GenerateSW(),
  ],

  module: {
    rules: [
      ...(commonConfig.module?.rules || []),
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

export default prodConfig;
