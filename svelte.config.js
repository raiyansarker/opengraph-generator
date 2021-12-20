import adapter from '@sveltejs/adapter-auto';
import cloudflare from '@sveltejs/adapter-cloudflare';

const isProd = process.env.NODE_ENV == 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: isProd
			? cloudflare({
					target: 'es2020',
					platform: 'browser',
					entryPoints: '< input >',
					outfile: '<output>/_worker.js',
					allowOverwrite: true,
					format: 'esm',
					bundle: true
			  })
			: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
