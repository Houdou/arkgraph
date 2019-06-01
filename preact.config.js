const { generateSw } = require('preact-cli-workbox-plugin');
export default function(config, env, helpers) {
	return generateSw(config, helpers, {
		exclude: [
			/route-info\.chunk\.\w{5}\.esm.js/,
			/route-info\.chunk\.\w{5}\.css/,
		],
	});
}
