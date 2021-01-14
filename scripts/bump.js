const { storage } = require('../src/config/version.json');

const [major, minor, patch] = storage.split('.').map(Number);

const version = {
	storage: `${major}.${minor}.${patch + 1}`,
};

require('fs').writeFileSync(require('path').resolve(__dirname, '../src/config', 'version.json'), JSON.stringify(version, null, 2));
