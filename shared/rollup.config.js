import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
      presets: ['@babel/preset-typescript'],
    }),
  ],
};

export default config;
