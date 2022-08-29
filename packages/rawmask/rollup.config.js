import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import packageJson from './package.json';

export default [
  {
    input: './src/main/index.ts',
    output: [
      { file: packageJson.main, format: 'iife', name: packageJson.name },
      { file: packageJson.module, format: 'esm', name: packageJson.name },
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
    output: { file: packageJson.types, format: 'esm' },
    plugins: [dts()],
  },
];
