const path = require('path');

const LANG = [
	'en_US',
	'ja_JP',
	'ko_KR',
	'zh_CN',
	// 'zh_TW',
];

const stages_data = {};

const readTable = (lang) => {
	const repo = lang === 'zh_CN' ? 'data' : 'data-i18n';

	const { stages } = require(path.resolve(__dirname, `./${repo}/${lang}/gamedata/excel/stage_table.json`));
	Object.entries(stages)
		.forEach(([
			key, value,
		]) => {
			const {
				code,
			} = value;

			stages_data[key] = stages_data[key] || {};
			stages_data[key].code = code;

			stages_data[key][lang] = stages_data[key][lang] || {};
			stages_data[key][lang].enabled = true;
		});
};

LANG.forEach(lang => {
	readTable(lang);
});

require('fs').writeFileSync(require('path').resolve(__dirname, '../../src/i18n', 'levels.json'), JSON.stringify(stages_data, null, 2));
