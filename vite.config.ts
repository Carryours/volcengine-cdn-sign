import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'cdn-sign',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `cdn-sign.${format}.js`,
    },
    rollupOptions: {
      // 排除依赖不打包进最终文件
      external: ['crypto-js'],
      output: {
        globals: {
          'crypto-js': 'CryptoJS',
        },
      },
      // 排除 test 文件
      input: path.resolve(__dirname, 'src/index.ts'),
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
