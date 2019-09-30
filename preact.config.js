const { generateSw } = require('preact-cli-workbox-plugin');
export default function(config, env, helpers) {
	if (env.isProd) {
		config.devtool = false;
	}
	return generateSw(config, helpers, {
		include: [/\.jpg$/, /\.png$/],
		exclude: [/\.js$/, /\.css/, /plan$/],
	});
}
