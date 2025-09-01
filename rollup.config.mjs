import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
	input: 'components/index.ts',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
			sourcemap: true,
			exports: 'named',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM'
			}
		},
		{
			file: 'dist/index.esm.js',
			format: 'esm',
			sourcemap: true,
		},
	],
	external: [
		'react',
		'react-dom',
		'@tanstack/react-query',
		'axios',
		'use-sync-external-store/shim',
		/^@radix-ui\/.*/,
		'class-variance-authority',
		'clsx',
		'tailwindcss',
		'next-themes',
		'react-day-picker',
		'embla-carousel-react',
		'recharts',
		'cmdk',
		'vaul',
		'react-hook-form',
		'input-otp',
		'react-resizable-panels',
		'sonner'
	],
	plugins: [
		resolve({
			preferBuiltins: true
		}),
		commonjs({
			include: /node_modules/
		}),
		json(),
		typescript({
			tsconfig: './tsconfig.build.json',
			declaration: true,
			declarationDir: 'dist',
			jsx: 'react-jsx',
			exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
			noEmitOnError: false,
			rootDir: './',
			outDir: 'dist'
		}),
		postcss({
			extract: 'styles.css',
			minimize: true,
			extensions: ['.css'],
			use: ['sass'],
			config: {
				path: './postcss.config.js',
				ctx: {
					env: 'production'
				}
			},
			plugins: []  // Os plugins serão carregados pelo arquivo de configuração postcss.config.js
		})
	],
};
