import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const fileName = 'index.js';

export default {
  input: './example/index.ts',
  output: {
    file: `./example/dist/${fileName}`,
    format: 'es',
    name: 'example',
    sourcemap: true,
  },
  plugins: [
    sourcemaps(),
    nodeResolve({ extensions: ['.ts', '.tsx'] }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV,
      preventAssignment: true,
    }),
    serve('./example/dist'),
    html({
      template: () => `<!doctype html>
<html lang='en'>
  <head>
    <title>@rawmask/react</title>
  </head>
  <body style='background-color: black'>
    <input id='root'/>
    <script src='${fileName}'></script>
  </body>
</html>
`,
    }),
  ],
};
