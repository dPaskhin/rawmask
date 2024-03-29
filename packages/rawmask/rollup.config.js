import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import packageJson from './package.json';

const createOutput = (file, format) => ({
  file,
  format,
  name: packageJson.name,
});

export default [
  {
    input: './src/main/index.ts',
    output: [
      createOutput(packageJson.exports.default, 'umd'),
      createOutput(packageJson.exports.import, 'esm'),
      createOutput(packageJson.exports.require, 'cjs'),
    ],
    plugins: [
      nodeResolve({ extensions: ['.ts'] }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.ts'],
      }),
      terser(),
      process.env.BUNDLE_ANALYZE === 'true'
        ? visualizer({ open: true, gzipSize: true, brotliSize: true })
        : undefined,
    ],
  },
  {
    input: './src/main/index.ts',
    output: createOutput(packageJson.types, 'esm'),
    plugins: [dts()],
  },
];
