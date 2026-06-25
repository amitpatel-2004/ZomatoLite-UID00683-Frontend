import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'node:path';
import type { Configuration } from 'webpack';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

const rootDir = process.cwd();

const prodConfig: Configuration = {
  mode: 'production',

  plugins: [new MiniCssExtractPlugin(), new WorkboxWebpackPlugin.GenerateSW()],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

export default prodConfig;
