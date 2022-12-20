import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(({ mode }) => {
	return {
		publicDir: './../www/dist/static',
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
		base: '/',
		build: {
			manifest: true,
			outDir: './../www/dist/',
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
		},
		plugins: [
			viteStaticCopy({
				targets: [
					{
						src: './node_modules/jquery/dist/jquery.min.js',
						dest: 'jquery'
					},
					{
						src: './node_modules/naja/dist/Naja.min.js',
						dest: 'naja'
					}
				]
			})
		]
	}
});
