const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const { dts } = require('rollup-plugin-dts');

module.exports = [
  {
    input: 'src/index.tsx',
    external: ['react', 'react-native', 'react-native-reanimated', 'react-native-gesture-handler'],
    output: [
      {
        dir: 'lib/commonjs/',
        format: 'cjs',
        sourcemap: true,
        name: 'commonjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        dir: 'lib/module/',
        format: 'esm',
        sourcemap: true,
        name: 'module',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'runtime',
      }),
    ],
  },
  {
    input: 'src/index.tsx',
    output: [{ dir: 'lib/typescript', format: 'esm', preserveModules: true }],
    plugins: [dts()],
  },
];
