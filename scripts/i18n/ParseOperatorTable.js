const path = require('path');
const pinyin = require('pinyin');
const { default: toHiragana } = require('jaco/fn/toHiragana');

const LANG = [
	'en_US',
	'ja_JP',
	'ko_KR',
	'zh_CN',
	// 'zh_TW',
];

const operator_data = {};

const readTable = (lang) => {
	const repo = lang === 'zh_CN' ? 'data' : 'data-i18n';
	
	const characters = require(path.resolve(__dirname, `./${repo}/${lang}/gamedata/excel/character_table.json`));
	const skills = require(path.resolve(__dirname, `./${repo}/${lang}/gamedata/excel/skill_table.json`));

	const patch_characters = require(path.resolve(__dirname, `./${repo}/${lang}/gamedata/excel/char_patch_table.json`));

	Object.entries(patch_characters.patchChars).forEach(([unique_id, value]) => {
		characters[unique_id] = {
			...value,
			name: (() => {
				switch (lang) {
					case 'zh_CN':
						return `升变${value.name}`;
					case 'ja_JP':
						return `昇格${value.name}`;
					case 'en_US':
					case 'ko_KR':
						return `Promoted ${value.name}`;
				}
			})(),
		};
	});

	Object.entries(characters)
		.filter(
			// Duplicated rogue characters
			([unique_id]) => unique_id !== 'char_512_aprot' // char_4025_aprot2
		)
		.forEach(([unique_id, value]) => {
			operator_data[unique_id] = operator_data[unique_id] || {};
			operator_data[unique_id][lang] = {
				enabled: true,
				name: value.name,
				skills: value.skills.map(({ skillId }) => skills[skillId] ? skills[skillId].levels[0].name : ''),
				alias: [],
			};
			if (lang === 'zh_CN') {
				const operator_pinyin = [].concat(...pinyin(value.name, {
					style: pinyin.STYLE_NORMAL,
				}));
				operator_data[unique_id][lang].alias.push(operator_pinyin.join(' '));
				operator_data[unique_id][lang].alias.push(operator_pinyin.join(''));
				operator_data[unique_id][lang].appellation = value.appellation;
			}
			if (lang === 'ja_JP') {
				const operator_hiragana = toHiragana(value.name);
				operator_data[unique_id][lang].alias.push(operator_hiragana);
			}
		});
};

LANG.forEach(lang => {
	readTable(lang);
});

Object.entries(operator_data).forEach(([key, value]) => {
	operator_data[key].code = value.en_US && value.en_US.name && value.en_US.name.toLowerCase() || null;
	operator_data[key].code_name = value.zh_CN && value.zh_CN.appellation || null;
});

require('fs').writeFileSync(require('path').resolve(__dirname, '../../src/i18n', 'operators.json'), JSON.stringify(operator_data, null, 2));


