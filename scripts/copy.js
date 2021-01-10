const path = require('path');
const copydir = require('copy-dir');

copydir.sync(path.resolve(__dirname, './i18n/data/zh_CN/gamedata/excel'), path.resolve(__dirname, './an'), {
	utimes: true,
	mode: true,
	cover: true,
});