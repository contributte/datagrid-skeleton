import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
	return {
		publicDir: './../www/public/static',
		resolve: {
			alias: {
				'@': resolve(__dirname, 'assets/js'),
				'~': resolve(__dirname, 'node_modules'),
			},
		},
		server: {
			open: false,
			hmr: false,
		},
		base: '/dist/',
		build: {
			manifest: true,
			outDir: './../www/public/dist/',
			emptyOutDir: true,
			minify: 'esbuild',
			rollupOptions: {
				output: {
					manualChunks: undefined,
					chunkFileNames: '[name]-[hash].js',
					entryFileNames: '[name].[hash].js',
					assetFileNames: '[name].[hash].[ext]',
				},
				input: {
					app: './js/main.js'
				}
			}
		}
	}
});
