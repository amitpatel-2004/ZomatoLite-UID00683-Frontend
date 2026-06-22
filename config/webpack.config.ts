import Dotenv from 'dotenv-webpack';
import path from 'node:path';
import type { Configuration } from 'webpack';

import commonConfig from './webpack.common.ts';
import devConfig from './webpack.dev.ts';
import prodConfig from './webpack.prod.ts';

const rootDir = process.cwd();

const mainWebpackConfig = (_env: Record<string, unknown>, argv: Configuration): Configuration => {
  const isProd = argv.mode === 'production';
  const environmentConfig = isProd ? prodConfig : devConfig;
  const envFile = isProd ? '.env.production' : '.env';

  return {
    ...commonConfig,
    ...environmentConfig,
    output: {
      ...commonConfig.output,
      ...environmentConfig.output,
    },
    plugins: [
      new Dotenv({ path: path.resolve(rootDir, envFile), safe: false }),
      ...(commonConfig.plugins || []),
      ...(environmentConfig.plugins || []),
    ],
    module: {
      ...commonConfig.module,
      rules: [...(commonConfig.module?.rules || []), ...(environmentConfig.module?.rules || [])],
    },
  };
};

export default mainWebpackConfig;
