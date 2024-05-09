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

const profession_map = {
	"zh_CN": {
		"PIONEER": "先锋",
		"WARRIOR": "近卫",
		"TANK": "重装",
		"SNIPER": "狙击",
		"CASTER": "术师",
		"MEDIC": "医疗",
		"SUPPORT": "辅助",
		"SPECIAL": "特种",
	},
	"en_US": {
		"PIONEER": "Pioneer",
		"WARRIOR": "Warrior",
		"TANK": "Tank",
		"SNIPER": "Sniper",
		"CASTER": "Caster",
		"MEDIC": "Medic",
		"SUPPORT": "Support",
		"SPECIAL": "Special",
	},
	"ja_JP": {
		"PIONEER": "先鋒",
		"WARRIOR": "前衛",
		"TANK": "重装",
		"SNIPER": "狙撃",
		"CASTER": "術師",
		"MEDIC": "医療",
		"SUPPORT": "補助",
		"SPECIAL": "特殊",
	},
	"ko_KR": {
		"PIONEER": "뱅가드",
		"WARRIOR": "가드",
		"TANK": "디펜더",
		"SNIPER": "스나이퍼",
		"CASTER": "캐스터",
		"MEDIC": "메딕",
		"SUPPORT": "서포터",
		"SPECIAL": "스페셜리스트",
	},
}

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
						return `升变${value.name}${profession_map[lang][value.profession]}`;
					case 'ja_JP':
						return `昇格${value.name}${profession_map[lang][value.profession]}`;
					case 'en_US':
					case 'ko_KR':
						return `Promoted ${value.name} ${profession_map['en_US'][value.profession]}`;
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


