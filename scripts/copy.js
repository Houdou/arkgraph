const path = require('path');
const copydir = require('copy-dir');

copydir.sync(path.resolve(__dirname, './i18n/data/zh_CN/gamedata/excel'), path.resolve(__dirname, './excels'), {
	utimes: true,
	mode: true,
	cover: true,
});

copydir.sync(path.resolve(__dirname, './i18n/data/zh_CN/gamedata/art'), path.resolve(__dirname, './handbook'), {
	utimes: true,
	mode: true,
	cover: true,
});