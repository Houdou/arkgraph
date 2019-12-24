import { MONEY, PURCHASE_CREDIT, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../../models/Resources';

const material_list = [
	MONEY,
	PURCHASE_CREDIT,
	...EXP_TAPES,
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
];

const indexed_material_list = material_list.map((m, index) => ({
	material: m,
	index,
}));

const material_grouping_options = {
	default: {
		render: '全部',
		field: null,
		options: [],
		groups: {},
	},
	type: {
		render: '种类',
		field: 'type',
		options: [
			{ value: 'money', render: '货币' },
			{ value: 'tape', render: '作战记录' },
			{ value: 'rare', render: '高级材料' },
			{ value: 'alcohol', render: '醇' },
			{ value: 'manganese', render: '锰' },
			{ value: 'grind', render: '研磨石' },
			{ value: 'rma', render: 'RMA' },
			{ value: 'stone', render: '源岩' },
			{ value: 'device', render: '装置' },
			{ value: 'ester', render: '酯' },
			{ value: 'sugar', render: '糖' },
			{ value: 'iron', render: '异铁' },
			{ value: 'ketone', render: '酮' },
			{ value: 'gel', render: '凝胶' },
			{ value: 'alloy', render: '合金' },
			{ value: 'skill', render: '技巧概要' },
			{ value: 'chip', render: '芯片' },
		],
		groups: {},
	},
	tier: {
		render: '等级',
		field: 'tier',
		options: [
			{ value: 'T5', render: '5级材料' },
			{ value: 'T4', render: '4级材料' },
			{ value: 'T3', render: '3级材料' },
			{ value: 'T2', render: '2级材料' },
			{ value: 'T1', render: '1级材料' },
		],
		groups: {},
	},
};

Object.entries(material_grouping_options)
	.forEach(([key, data]) => {
		if (!data.field) {
			return;
		}
		data.options.forEach(({ value, render }) => {
			material_grouping_options[key].groups[value] =
				{
					render,
					list: indexed_material_list
						.filter(({ material }) => material[data.field] === value)
						.map(({ index }) => index),
				};
		});
	});

// Special handling for chip
material_grouping_options.type.groups.chip.render = '助剂';
const profession_chip_index = material_grouping_options.type.groups.chip.list.splice(1, 3 * 8);
const professions = [
	{ value: 'pioneer', render: '先锋' },
	{ value: 'warrior', render: '近卫' },
	{ value: 'tank', render: '重装' },
	{ value: 'sniper', render: '狙击' },
	{ value: 'caster', render: '术师' },
	{ value: 'medic', render: '医疗' },
	{ value: 'support', render: '辅助' },
	{ value: 'special', render: '特种' },
];
professions.forEach(({ value, render }, index) => {
	material_grouping_options.type.groups[`chip_${value}`] = {
		render: `${render}芯片`,
		list: profession_chip_index.splice(0, 3),
	};
});

export {
	material_grouping_options,
	material_list,
};
