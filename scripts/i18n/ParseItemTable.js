const path = require('path');
const pinyin = require('pinyin');
const { default: toHiragana } = require('jaco/fn/toHiragana');

const ItemMapping = require('./item_mapping.json');

const LANG = [
	'en_US',
	'ja_JP',
	'ko_KR',
	'zh_CN',
	'zh_TW',
];

const item_data = {};
Object.entries(ItemMapping).forEach(([key, value]) => {
	item_data[value] = {};
	LANG.forEach(lang => {
		item_data[value][lang] = {
			enabled: false,
			name: '',
			alias: [],
		};
	});
});

const readTable = (lang) => {
	const { items } = require(path.resolve(__dirname, `./data/${lang}/gamedata/excel/item_table.json`));
	Object.entries(items)
		.filter(([unique_id, value]) => ItemMapping[unique_id])
		.forEach(([unique_id, value]) => {
			const item_id = ItemMapping[unique_id];
			const {
				name,
			} = value;
			item_data[item_id][lang].enabled = true;
			item_data[item_id][lang].name = name;
			item_data[item_id][lang].alias = [];
			if (lang === 'zh_CN') {
				const item_pinyin = [].concat(...pinyin(value.name, {
					style: pinyin.STYLE_NORMAL,
				}));
				item_data[item_id][lang].alias.push(item_pinyin.join(' '));
				item_data[item_id][lang].alias.push(item_pinyin.join(''));
			}
			if (lang === 'ja_JP' && item_data[item_id][lang]) {
				const item_hiragana = toHiragana(value.name);
				item_data[item_id][lang].alias.push(item_hiragana);
			}
		});
};

LANG.forEach(lang => {
	readTable(lang);
});

require('fs').writeFileSync(require('path').resolve(__dirname, '../../src/i18n', 'items.json'), JSON.stringify(item_data, null, 2));


