import item_i18n from '../../i18n/items.json';
import { locale as available_locale } from '../../i18n/locale';

const LANG = Object.keys(available_locale);

const findResourceByName = (name, scope = null) => {
	const scope_ids = scope !== null && scope.map(({ unique_id }) => unique_id);
	for (const item of Object.entries(item_i18n)) {
		const candidate = Object.entries(item[1])
			.filter(([lang]) => LANG.includes(lang))
			.filter(([lang, item_lang]) => scope === null || scope_ids.includes(item[0]))
			.find(([lang, item_lang]) => item_lang && item_lang.enabled && item_lang.name === name);
		if (candidate) {
			return {
				locale: candidate[0],
				unique_id: item[0],
			};
		}
	}
};

const getResourceName = ({ id, locale, fallback }) => {
	const item = item_i18n[id];
	if (item) {
		const locale_item = item[locale];
		if (locale_item && locale_item.enabled) {
			const name = locale_item.name;
			return name;
		}
	}
	return fallback;
};

export const parseQuantity = (quantity, locale) => {
	if (quantity > 10000 && ['zh_US', 'ja_JP'].includes(locale)) {
		return `${Math.round(quantity/10000)}万`;
	}
	if (quantity > 1000000) {
		return `${Math.round(quantity/100000) / 10}M`;
	}
	if (quantity > 1000) {
		return `${Math.round(quantity/1000)}K`;
	}
	return quantity;
};

const MATERIALS = require('./materials.json');

const SKILL_BOOKS = [
	{
		id: 'S-4-1',
		unique_id: 3303,
		name: '技巧概要·卷3',
		pinyin: 'ji qiao juan yao juan 3',
		tier: 'T4',
		type: 'skill',
		source: {
			'CA-4': '固定',
			'CA-5': '固定',
		},
		formula: {
			'S-3-1': 3,
		},
	},
	{
		id: 'S-3-1',
		unique_id: 3302,
		name: '技巧概要·卷2',
		pinyin: 'ji qiao juan yao juan 2',
		tier: 'T3',
		type: 'skill',
		source: {
			'CA-3': '固定',
			'CA-4': '固定',
			'CA-5': '固定',
		},
		formula: {
			'S-2-1': 3,
		},
	},
	{
		id: 'S-2-1',
		unique_id: 3301,
		name: '技巧概要·卷1',
		pinyin: 'ji qiao juan yao juan 1',
		tier: 'T2',
		type: 'skill',
		source: {
			'CA-1': '固定',
			'CA-2': '固定',
			'CA-3': '固定',
			'CA-4': '固定',
			'CA-5': '固定',
		},
		formula: {},
	},
];

const EXP_TAPES = require('./exp_tapes.json');

const CHIPS = [
	{
		id: 'O-4-1',
		unique_id: 32001,
		name: '芯片助剂',
		pinyin: 'xin pian zhu ji',
		tier: 'T4',
		type: 'chip',
		source: {},
		formula: {
			'PC-3-1': 90,
		},
	},
	{
		id: 'C-5-1',
		unique_id: 3213,
		name: '先锋双芯片',
		pinyin: 'xian feng shuang xin pian',
		tier: 'T5',
		type: 'chip',
		source: {},
		formula: {
			'C-4-1': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-1',
		unique_id: 3212,
		name: '先锋芯片组',
		pinyin: 'xian feng xin pian zu',
		tier: 'T4',
		type: 'chip',
		source: {
			'PR-C-2': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-3-1',
		unique_id: 3211,
		name: '先锋芯片',
		pinyin: 'xian feng xin pian',
		tier: 'T3',
		type: 'chip',
		source: {
			'PR-C-1': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-5-2',
		unique_id: 3223,
		name: '近卫双芯片',
		pinyin: 'jin wei shuang xin pian',
		tier: 'T5',
		type: 'chip',
		source: {},
		formula: {
			'C-4-2': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-2',
		unique_id: 3222,
		name: '近卫芯片组',
		pinyin: 'jin wei xin pian zu',
		tier: 'T4',
		type: 'chip',
		source: {
			'PR-D-2': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-3-2',
		unique_id: 3221,
		name: '近卫芯片',
		pinyin: 'jin wei xin pian',
		tier: 'T3',
		type: 'chip',
		source: {
			'PR-D-1': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-5-3',
		unique_id: 3233,
		name: '重装双芯片',
		pinyin: 'zhong zhuang shuang xin pian',
		tier: 'T5',
		type: 'chip',
		source: {},
		formula: {
			'C-4-3': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-3',
		unique_id: 3232,
		name: '重装芯片组',
		pinyin: 'zhong zhuang xin pian zu',
		tier: 'T4',
		type: 'chip',
		source: {
			'PR-A-2': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-3-3',
		unique_id: 3231,
		name: '重装芯片',
		pinyin: 'zhong zhuang xin pian',
		tier: 'T3',
		type: 'chip',
		source: {
			'PR-A-1': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-5-4',
		unique_id: 3243,
		name: '狙击双芯片',
		pinyin: 'ju ji shuang xin pian',
		tier: 'T5',
		type: 'chip',
		source: {},
		formula: {
			'C-4-4': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-4',
		unique_id: 3242,
		name: '狙击芯片组',
		pinyin: 'ju ji xin pian zu',
		tier: 'T4',
		type: 'chip',
		source: {
			'PR-B-2': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-3-4',
		unique_id: 3241,
		name: '狙击芯片',
		pinyin: 'ju ji xin pian',
		tier: 'T3',
		type: 'chip',
		source: {
			'PR-B-1': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-5-5',
		unique_id: 3253,
		name: '术师双芯片',
		pinyin: 'shu shi shuang xin pian',
		tier: 'T5',
		type: 'chip',
		source: {},
		formula: {
			'C-4-5': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-5',
		unique_id: 3252,
		name: '术师芯片组',
		pinyin: 'shu shi xin pian zu',
		tier: 'T4',
		type: 'chip',
		source: {
			'PR-B-2': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-3-5',
		unique_id: 3251,
		name: '术师芯片',
		pinyin: 'shu shi xin pian',
		tier: 'T3',
		type: 'chip',
		source: {
			'PR-B-1': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-5-6',
		unique_id: 3263,
		name: '医疗双芯片',
		pinyin: 'yi liao shuang xin pian',
		tier: 'T5',
		type: 'chip',
		source: {},
		formula: {
			'C-4-6': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-6',
		unique_id: 3262,
		name: '医疗芯片组',
		pinyin: 'yi liao xin pian zu',
		tier: 'T4',
		type: 'chip',
		source: {
			'PR-A-2': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-3-6',
		unique_id: 3261,
		name: '医疗芯片',
		pinyin: 'yi liao xin pian',
		tier: 'T3',
		type: 'chip',
		source: {
			'PR-A-1': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-5-7',
		unique_id: 3273,
		name: '辅助双芯片',
		pinyin: 'fu zhu shuang xin pian',
		tier: 'T5',
		type: 'chip',
		source: {},
		formula: {
			'C-4-7': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-7',
		unique_id: 3272,
		name: '辅助芯片组',
		pinyin: 'fu zhu xin pian zu',
		tier: 'T4',
		type: 'chip',
		source: {
			'PR-C-2': '中概率',
		},
		formula: {},
	},

	{
		unique_id: 3271,
		id: 'C-3-7',
		name: '辅助芯片',
		pinyin: 'fu zhu xin pian',
		tier: 'T3',
		type: 'chip',
		source: {
			'PR-C-1': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-5-8',
		unique_id: 3283,
		name: '特种双芯片',
		pinyin: 'te zhong shuang xin pian',
		tier: 'T5',
		type: 'chip',
		source: {},
		formula: {
			'C-4-8': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-8',
		unique_id: 3282,
		name: '特种芯片组',
		pinyin: 'te zhong xin pian zu',
		tier: 'T4',
		type: 'chip',
		source: {
			'PR-D-2': '中概率',
		},
		formula: {},
	},
	{
		id: 'C-3-8',
		unique_id: 3281,
		name: '特种芯片',
		pinyin: 'te zhong xin pian',
		tier: 'T3',
		type: 'chip',
		source: {
			'PR-D-1': '中概率',
		},
		formula: {},
	},
];

class Resource {
	constructor({ id, name, tier, type, formula, source, unique_id }) {
		this.id = id;
		this.name = name;
		this.tier = tier;
		this.type = type;
		this.formula = formula;
		this.source = source;
		this.unique_id = unique_id;
	}
}

const RESOURCES = {};

const MONEY = {
	id: 'G-4-1',
	unique_id: 4001,
	name: '龙门币',
	tier: 'T4',
	type: 'money',
	source: {
		'CE-1': '固定[1700]',
		'CE-2': '固定[2800]',
		'CE-3': '固定[4100]',
		'CE-4': '固定[5700]',
		'CE-5': '固定[7500]',
	},
	formula: {},
};

const PURCHASE_CREDIT = {
	id: 'PC-3-1',
	unique_id: 4006,
	name: '采购凭证',
	tier: 'T3',
	type: 'money',
	source: {
		'AP-1': '固定[4~6]',
		'AP-2': '固定[7~9]',
		'AP-3': '固定[11~13]',
		'AP-4': '固定[15~17]',
		'AP-5': '固定[20~22]',
	},
	formula: {},
};

const EXP = {
	id: 'EO-4-1',
	unique_id: 5001,
	name: '经验值',
	tier: 'T4',
	type: 'exp',
	source: {},
	formula: {},
};

const MOD_TOKENS = [
	{
		id: 'W-5-1',
		unique_id: 'mod_unlock_token',
		name: '模组数据块',
		tier: 'T5',
		type: 'rare',
		source: {},
		formula: {},
	},
	{
		id: 'W-5-2',
		unique_id: 'mod_update_token_1',
		name: '数据增补条',
		tier: 'T4',
		type: 'rare',
		source: {},
		formula: {},
	},
	{
		id: 'W-5-3',
		unique_id: 'mod_update_token_2',
		name: '数据增补仪',
		tier: 'T5',
		type: 'rare',
		source: {},
		formula: {},
	},
];

[
	MONEY,
	PURCHASE_CREDIT,
	EXP,
	...MOD_TOKENS,
	...MATERIALS,
	...SKILL_BOOKS,
	...EXP_TAPES,
	...CHIPS,
].forEach(M => {
	RESOURCES[M.id] = new Resource(M);
});

export {
	MONEY,
	PURCHASE_CREDIT,
	EXP,
	MOD_TOKENS,
	RESOURCES,
	MATERIALS,
	SKILL_BOOKS,
	EXP_TAPES,
	CHIPS,
	findResourceByName,
	getResourceName,
};

export default Resource;
