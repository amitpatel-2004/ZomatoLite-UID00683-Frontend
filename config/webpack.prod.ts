import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

const prodConfig: Configuration = {
  mode: 'production',

  plugins: [new MiniCssExtractPlugin(), new WorkboxWebpackPlugin.GenerateSW()],

  module: {
    rules: [
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
