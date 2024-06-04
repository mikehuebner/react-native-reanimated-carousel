import fs from 'fs/promises';

import react from '@vitejs/plugin-react-swc';
// @ts-expect-error == types do not exist
import flowRemoveTypes from 'flow-remove-types';
import { Plugin as VitePlugin, defineConfig, transformWithEsbuild } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { Plugin as ESBuildPlugin } from 'esbuild';

const extensions = [
  '.web.mjs',
  '.mjs',
  '.web.js',
  '.js',

  '.web.mts',
  '.mts',
  '.web.ts',
  '.ts',

  '.web.jsx',
  '.jsx',

  '.web.tsx',
  '.tsx',

  '.json',
];

const filter = /\.(js|flow)$/;

const loader = {
  '.js': 'jsx',
} as const;

const esbuildPlugin = () =>
  ({
    name: 'react-native-web',
    setup: (build) => {
      build.onLoad({ filter }, async ({ path }) => {
        const src = await fs.readFile(path, 'utf-8');
        return {
          contents: flowRemoveTypes(src).toString(),
          loader: loader['.js'],
        };
      });
    },
  }) satisfies ESBuildPlugin;

const reactNativeWeb = () =>
  ({
    enforce: 'pre',
    name: 'react-native-web',

    config: (_, env) => ({
      define: {
        // Reanimated support
        '_frameTimestamp': undefined,
        '_WORKLET': false,
        '__DEV__': `${env.mode === 'development' ? true : false}`,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
      resolve: {
        extensions,
        alias: {
          'react-native': 'react-native-web',
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          plugins: [esbuildPlugin()],
          resolveExtensions: extensions,
        },
      },
    }),

    async transform(code, id) {
      if (!filter.test(id)) return code;

      if (code.includes('@flow')) code = flowRemoveTypes(code).toString();

      return (
        await transformWithEsbuild(code, id, {
          loader: loader['.js'],
          jsx: 'automatic',
        })
      ).code;
    },
  }) satisfies VitePlugin;

export default defineConfig({
  clearScreen: true,
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: [
      '@react-navigation/native',
      '@react-navigation/stack',
      'react-native-gesture-handler',
      'react-native-reanimated',
    ],
  },
  plugins: [react(), reactNativeWeb(), tsconfigPaths()],
});
