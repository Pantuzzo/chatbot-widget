import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: 'dist/index.modern.js',
      format: 'es'
    }
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json'
    })
  ],
  external: ['react', 'react-dom', 'use-sync-external-store/shim'],
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
    warn(warning);
  }
});