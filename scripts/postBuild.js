const fs = require('fs');
const path = require('path');

fs.copyFileSync(
	path.join(__dirname, '../build/index.html'),
	path.join(__dirname, '../build/404.html'),
);
