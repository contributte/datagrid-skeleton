import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
	const DEV = mode === 'development';

	return {
		publicDir: './public/static',
		resolve: {
			alias: {
				'@': resolve(__dirname, 'assets/js'),
				'~': resolve(__dirname, 'node_modules'),
			},
		},
		base: '/dist/',
		server: {
			open: false,
			hmr: false,
		},
		css: {
			postcss: [
				"autoprefixer"
			]
		},
		build: {
			manifest: true,
			outDir: './public/dist/',
			emptyOutDir: false,
			minify: DEV ? false : 'esbuild',
			rollupOptions: {
				output: {
					manualChunks: undefined,
					chunkFileNames: DEV ? '[name].js' : '[name]-[hash].js',
					entryFileNames: DEV ? '[name].js' : '[name].[hash].js',
					assetFileNames: DEV ? '[name].[ext]' : '[name].[hash].[ext]',
				},
				input: {
					app: './assets/js/app.js'
				}
			}
		},
	}
});
