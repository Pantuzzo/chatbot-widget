import alias from '@rollup/plugin-alias';
import path from 'path';

export default {
  tsconfig: 'tsconfig.build.json',
  format: 'modern,cjs', 
  jsx: 'React.createElement',
  compress: false,
  external: ['react', 'react-dom', 'use-sync-external-store/shim'],
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@/components', replacement: path.resolve(__dirname, 'components') },
        { find: '@/lib', replacement: path.resolve(__dirname, 'lib') }
      ]
    })
  ]
};