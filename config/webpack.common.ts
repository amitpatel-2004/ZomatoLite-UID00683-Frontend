import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'node:path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';

const rootDir = process.cwd();

const commonConfig: Configuration = {
  entry: [path.resolve(rootDir, 'src/index.tsx'), path.resolve(rootDir, 'src/styles/main.scss')],
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new Dotenv({ path: path.resolve(rootDir, '.env'), safe: false }),
    new HtmlWebpackPlugin({ template: path.resolve(rootDir, 'public/index.html') }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(rootDir, 'tsconfig.json'),
      }),
    ],
  },
};

export default commonConfig;
