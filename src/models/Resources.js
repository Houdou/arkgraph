import item_i18n from '../i18n/items.json';
import { locale as available_locale } from '../i18n/locale';

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

const MATERIALS = [
	{
		id: 'M-5-1',
		unique_id: 30135,
		name: 'D32钢',
		pinyin: 'D32 gang',
		tier: 'T5',
		type: 'rare',
		source: {},
		formula: {
			'M-4-8': 1,
			'M-4-9': 1,
			'M-4-10': 1,
			'G-4-1': 400,
		},
	},
	{
		id: 'M-5-2',
		unique_id: 30125,
		name: '双极纳米片',
		pinyin: 'shuang ji na mi pian',
		tier: 'T5',
		type: 'rare',
		source: {},
		formula: {
			'M-4-2': 1,
			'M-4-7': 2,
			'G-4-1': 400,
		},
	},
	{
		id: 'M-5-3',
		unique_id: 30115,
		name: '聚合剂',
		pinyin: 'juheji',
		tier: 'T5',
		type: 'rare',
		source: {},
		formula: {
			'M-4-1': 1,
			'M-4-5': 1,
			'M-4-6': 1,
			'G-4-1': 400,
		},
	},
	{
		id: 'M-4-7',
		unique_id: 30074,
		name: '白马醇',
		pinyin: 'bai ma chun',
		tier: 'T4',
		type: 'alcohol',
		source: {
			'4-4': '罕见',
		},
		formula: {
			'M-3-7': 1,
			'M-3-4': 1,
			'M-3-10': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-7',
		unique_id: 30073,
		name: '扭转醇',
		pinyin: 'niu zhuan chun',
		tier: 'T3',
		type: 'alcohol',
		source: {
			'2-9': '小概率',
			'4-4': '小概率',
			'5-4': '小概率',
			'6-11': '中概率',
		},
		formula: {},
	},
	{
		id: 'M-4-8',
		unique_id: 30084,
		name: '三水锰矿',
		pinyin: 'san shui meng kuang',
		tier: 'T4',
		type: 'manganese',
		source: {
			'4-7': '罕见',
			'6-2': '罕见',
		},
		formula: {
			'M-3-8': 2,
			'M-3-3': 1,
			'M-3-7': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-8',
		unique_id: 30083,
		name: '轻锰矿',
		pinyin: 'qing meng kuang',
		tier: 'T3',
		type: 'manganese',
		source: {
			'3-2': '小概率',
			'4-7': '小概率',
			'5-6': '小概率',
			'6-2': '小概率',
		},
		formula: {},
	},
	{
		id: 'M-4-9',
		unique_id: 30094,
		name: '五水研磨石',
		pinyin: 'wu shui yan mo shi',
		tier: 'T4',
		type: 'grind',
		source: {
			'4-8': '罕见',
		},
		formula: {
			'M-3-9': 1,
			'M-3-5': 1,
			'M-3-2': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-9',
		unique_id: 30093,
		name: '研磨石',
		pinyin: 'yan mo shi',
		tier: 'T3',
		type: 'grind',
		source: {
			'3-3': '小概率',
			'4-8': '小概率',
			'5-7': '小概率',
			'6-14': '小概率',
		},
		formula: {},
	},
	{
		id: 'M-4-10',
		unique_id: 30104,
		name: 'RMA70-24',
		pinyin: 'RMA70-24',
		tier: 'T4',
		type: 'rma',
		source: {
			'4-9': '罕见',
			'6-15': '罕见',
		},
		formula: {
			'M-3-10': 1,
			'M-3-1': 2,
			'M-3-6': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-10',
		unique_id: 30103,
		name: 'RMA70-12',
		pinyin: 'RMA70-12',
		tier: 'T3',
		type: 'rma',
		source: {
			'2-10': '小概率',
			'4-9': '小概率',
			'5-9': '小概率',
			'6-15': '小概率',
		},
		formula: {},
	},
	{
		id: 'M-4-1',
		unique_id: 30014,
		name: '提纯源岩',
		pinyin: 'ti chun yuan yan',
		tier: 'T4',
		type: 'stone',
		source: {
			'4-6': '罕见',
		},
		formula: {
			'M-3-1': 4,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-1',
		unique_id: 30013,
		name: '固源岩组',
		pinyin: 'gu yuan yan zu',
		tier: 'T3',
		type: 'stone',
		source: {
			'2-4': '小概率',
			'4-6': '小概率',
			'5-1': '小概率',
			'6-5': '中概率',
		},
		formula: {
			'M-2-1': 5,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-1',
		unique_id: 30012,
		name: '固源岩',
		pinyin: 'gu yuan yan',
		tier: 'T2',
		type: 'stone',
		source: {
			'1-7': '固定',
			'S2-12': '固定',
			'5-10': '中概率',
			'S6-2': '固定',
			'S5-1': '固定',
		},
		formula: {
			'M-1-1': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-1',
		unique_id: 30011,
		name: '源岩',
		pinyin: 'yuan yan',
		tier: 'T1',
		type: 'stone',
		source: {
			'0-9': '固定',
			'S2-5': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-2',
		unique_id: 30064,
		name: '改量装置',
		pinyin: 'gai liang zhuang zhi',
		tier: 'T4',
		type: 'device',
		source: {
			'4-10': '罕见',
		},
		formula: {
			'M-3-2': 1,
			'M-3-1': 2,
			'M-3-9': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-2',
		unique_id: 30063,
		name: '全新装置',
		pinyin: 'quan xin zhuang zhi',
		tier: 'T3',
		type: 'device',
		source: {
			'3-4': '小概率',
			'4-10': '小概率',
			'5-10': '小概率',
			'6-16': '小概率',
		},
		formula: {
			'M-2-2': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-2',
		unique_id: 30062,
		name: '装置',
		pinyin: 'zhuang zhi',
		tier: 'T2',
		type: 'device',
		source: {
			'1-12': '中概率',
			'6-11': '中概率',
			'S3-4': '大概率',
			'S5-5': '大概率',
		},
		formula: {
			'M-1-2': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-2',
		unique_id: 30061,
		name: '破损装置',
		pinyin: 'po sun zhuang zhi',
		tier: 'T1',
		type: 'device',
		source: {
			'1-5': '中概率',
			'2-3': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-3',
		unique_id: 30034,
		name: '聚酸酯块',
		pinyin: 'ju suan zhi kuai',
		tier: 'T4',
		type: 'ester',
		source: {
			'3-8': '罕见',
			'6-4': '罕见',
		},
		formula: {
			'M-3-3': 2,
			'M-3-6': 1,
			'M-3-7': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-3',
		unique_id: 30033,
		name: '聚酸酯组',
		pinyin: 'ju suan zhi zu',
		tier: 'T3',
		type: 'ester',
		source: {
			'2-6': '小概率',
			'3-8': '小概率',
			'5-3': '中概率',
			'6-4': '小概率',
		},
		formula: {
			'M-2-3': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-3',
		unique_id: 30032,
		name: '聚酸酯',
		pinyin: 'ju suan zhi',
		tier: 'T2',
		type: 'ester',
		source: {
			'1-8': '大概率',
			'6-5': '小概率',
			'6-9': '固定',
			'S3-2': '固定',
			'S5-3': '固定',
		},
		formula: {
			'M-1-3': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-3',
		unique_id: 30031,
		name: '酯原料',
		pinyin: 'zhi yuan liao',
		tier: 'T1',
		type: 'ester',
		source: {
			'0-11': '固定',
			'S2-7': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-4',
		unique_id: 30024,
		name: '糖聚块',
		pinyin: 'tang ju kuai',
		tier: 'T4',
		type: 'sugar',
		source: {
			'4-2': '罕见',
			'5-2': '罕见',
		},
		formula: {
			'M-3-4': 2,
			'M-3-5': 1,
			'M-3-8': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-4',
		unique_id: 30023,
		name: '糖组',
		pinyin: 'tang zu',
		tier: 'T3',
		type: 'sugar',
		source: {
			'2-5': '小概率',
			'4-2': '小概率',
			'5-2': '小概率',
			'6-3': '小概率',
		},
		formula: {
			'M-2-4': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-4',
		unique_id: 30022,
		name: '糖',
		pinyin: 'tang',
		tier: 'T2',
		type: 'sugar',
		source: {
			'2-2': '大概率',
			'5-3': '中概率',
			'S3-1': '固定',
			'S5-4': '固定',
		},
		formula: {
			'M-1-4': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-4',
		unique_id: 30021,
		name: '代糖',
		pinyin: 'dai tang',
		tier: 'T1',
		type: 'sugar',
		source: {
			'0-7': '固定',
			'S2-6': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-5',
		unique_id: 30044,
		name: '异铁块',
		pinyin: 'yi tie kuai',
		tier: 'T4',
		type: 'iron',
		source: {
			'5-5': '罕见',
			'S4-1': '罕见',
		},
		formula: {
			'M-3-5': 2,
			'M-3-2': 1,
			'M-3-3': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-5',
		unique_id: 30043,
		name: '异铁组',
		pinyin: 'yi tie zu',
		tier: 'T3',
		type: 'iron',
		source: {
			'2-8': '小概率',
			'5-5': '小概率',
			'6-10': '小概率',
			'S4-1': '小概率',
		},
		formula: {
			'M-2-5': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-5',
		unique_id: 30042,
		name: '异铁',
		pinyin: 'yi tie',
		tier: 'T2',
		type: 'iron',
		source: {
			'2-1': '中概率',
			'5-7': '中概率',
			'6-1': '大概率',
			'S3-3': '固定',
		},
		formula: {
			'M-1-5': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-5',
		unique_id: 30041,
		name: '异铁碎片',
		pinyin: 'yi tie sui pian',
		tier: 'T1',
		type: 'iron',
		source: {
			'1-3': '大概率',
			'S2-8': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-6',
		unique_id: 30054,
		name: '酮阵列',
		pinyin: 'tong lie zhen',
		tier: 'T4',
		type: 'ketone',
		source: {
			'4-5': '罕见',
			'5-8': '罕见',
		},
		formula: {
			'M-3-6': 2,
			'M-3-4': 1,
			'M-3-8': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-6',
		unique_id: 30053,
		name: '酮凝集组',
		pinyin: 'tong ning ji zu',
		tier: 'T3',
		type: 'ketone',
		source: {
			'3-1': '小概率',
			'4-5': '小概率',
			'5-8': '小概率',
			'6-8': '小概率',
		},
		formula: {
			'M-2-6': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-6',
		unique_id: 30052,
		name: '酮凝集',
		pinyin: 'tong ning ji',
		tier: 'T2',
		type: 'ketone',
		source: {
			'S2-1': '中概率',
			'3-7': '固定',
			'6-16': '中概率',
			'S6-3': '大概率',
		},
		formula: {
			'M-1-6': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-6',
		unique_id: 30051,
		name: '双酮',
		pinyin: 'shuang tong',
		tier: 'T1',
		type: 'ketone',
		source: {
			'1-6': '大概率',
			'S2-9': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-11',
		unique_id: 31014,
		name: '聚合凝胶',
		pinyin: 'ju he ning jiao',
		tier: 'T4',
		type: 'gel',
		source: {},
		formula: {
			'M-3-5': 1,
			'M-3-11': 1,
			'M-3-12': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-11',
		unique_id: 31013,
		name: '凝胶',
		pinyin: 'ning jiao',
		tier: 'T3',
		type: 'gel',
		source: {
			'S4-10': '小概率',
			'S5-7': '小概率',
		},
		formula: {},
	},
	{
		id: 'M-4-12',
		unique_id: 31024,
		name: '炽合金块',
		pinyin: 'zhi he jin kuai',
		tier: 'T4',
		type: 'alloy',
		source: {},
		formula: {
			'M-3-2': 1,
			'M-3-9': 1,
			'M-3-12': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-12',
		unique_id: 31023,
		name: '炽合金',
		pinyin: 'zhi he jin',
		tier: 'T3',
		type: 'alloy',
		source: {
			'6-12': '小概率',
			'S3-6': '小概率',
			'S5-8': '小概率',
		},
		formula: {},
	},
];

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

const EXP_TAPES = [
	{
		id: 'E-5-1',
		unique_id: 2004,
		name: '高级作战记录',
		pinyin: 'gao ji zuo zhan ji lu',
		tier: 'T5',
		value: 2000,
		type: 'tape',
		source: {
			'LS-4': '固定[1]',
			'LS-5': '固定[3]',
		},
		formula: {
			'E-4-1': 2,
		},
	},
	{
		id: 'E-4-1',
		unique_id: 2003,
		name: '中级作战记录',
		pinyin: 'zhong ji zuo zhan ji lu',
		tier: 'T4',
		value: 1000,
		type: 'tape',
		source: {
			'LS-3': '固定[3]',
			'LS-4': '固定[1~3]',
			'LS-5': '固定[1]',
		},
		formula: {
			'E-3-1': 2,
			'E-2-1': 1,
		},
	},
	{
		id: 'E-3-1',
		unique_id: 2002,
		name: '初级作战记录',
		pinyin: 'chu ji zuo zhan ji lu',
		tier: 'T3',
		value: 400,
		type: 'tape',
		source: {
			'LS-1': '固定[3]',
			'LS-2': '固定[5]',
			'LS-3': '固定[1~3]',
			'LS-4': '固定[1~4]',
			'LS-5': '固定[1]',
		},
		formula: {
			'E-2-1': 2,
		},
	},
	{
		id: 'E-2-1',
		unique_id: 2001,
		name: '基础作战记录',
		pinyin: 'ji chu zuo zhan ji lu',
		tier: 'T2',
		value: 200,
		type: 'tape',
		source: {
			'LS-1': '固定[1~3]',
			'LS-2': '固定[3~5]',
			'LS-3': '固定[1~3]',
			'LS-4': '固定[1~3]',
		},
		formula: {},
	},
];

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

[
	MONEY,
	PURCHASE_CREDIT,
	EXP,
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
	RESOURCES,
	MATERIALS,
	SKILL_BOOKS,
	EXP_TAPES,
	CHIPS,
	findResourceByName,
	getResourceName,
};

export default Resource;
