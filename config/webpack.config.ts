import type { Configuration } from 'webpack';

import commonConfig from './webpack.common.ts';
import devConfig from './webpack.dev.ts';
import prodConfig from './webpack.prod.ts';

const mainWebpackConfig = (_env: Record<string, unknown>, argv: Configuration): Configuration => {
  const isProd = argv.mode === 'production';
  const environmentConfig = isProd ? prodConfig : devConfig;

  return {
    ...commonConfig,
    ...environmentConfig,
    output: {
      ...commonConfig.output,
      ...environmentConfig.output,
    },
    plugins: [...(commonConfig.plugins || []), ...(environmentConfig.plugins || [])],
    module: {
      ...commonConfig.module,
      rules: [...(commonConfig.module?.rules || []), ...(environmentConfig.module?.rules || [])],
    },
  };
};

export default mainWebpackConfig;
