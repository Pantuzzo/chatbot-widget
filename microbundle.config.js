const alias = require('@rollup/plugin-alias');
const path = require('path');
const typescript = require('rollup-plugin-typescript2');
const postcss = require('rollup-plugin-postcss');

module.exports = {
  entry: 'components/index.ts',
  formats: ['modern', 'cjs', 'esm'],
  jsx: 'react',
  jsxFragment: 'React.Fragment',
  compress: false,
  css: false,
  plugins: [
    postcss({
      config: {
        path: './postcss.config.js'
      },
      extract: true,
      modules: true,
      autoModules: true,
      minimize: true
    })
  ],
  external: [
    'react',
    'react-dom',
    '@tanstack/react-query',
    'axios',
    'use-sync-external-store/shim',
    '@radix-ui/*',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    'lucide-react'
  ],
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@tanstack/react-query': 'ReactQuery',
    'lucide-react': 'LucideReact',
    'axios': 'axios'
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfig: './tsconfig.build.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
          jsx: 'react',
          resolveJsonModule: true,
          esModuleInterop: true,
          skipLibCheck: true
        }
      },
      clean: true
    }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname) },
        { find: '@/components', replacement: path.resolve(__dirname, 'components') },
        { find: '@/lib', replacement: path.resolve(__dirname, 'lib') },
        { find: '@/hooks', replacement: path.resolve(__dirname, 'hooks') }
      ]
    })
  ],
  output: {
    dir: 'dist',
    sourcemap: true,
    exports: 'named'
  }
}