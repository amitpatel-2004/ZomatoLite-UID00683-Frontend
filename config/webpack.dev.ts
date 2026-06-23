import path from 'node:path';
import type { Configuration } from 'webpack';

import 'webpack-dev-server';

const rootDir = process.cwd();

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
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                loadPaths: [path.resolve(rootDir, 'src/styles')],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

export default devConfig;
