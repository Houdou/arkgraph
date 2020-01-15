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
		render: 'material_grouping_options-all',
		field: null,
		options: [],
		groups: {},
	},
	type: {
		render: 'material_grouping_options-type',
		field: 'type',
		options: [
			{ value: 'money', render: 'material_grouping_options-type-money' },
			{ value: 'tape', render: 'material_grouping_options-type-tape' },
			{ value: 'rare', render: 'material_grouping_options-type-rare' },
			{ value: 'alcohol', render: 'material_grouping_options-type-alcohol' },
			{ value: 'manganese', render: 'material_grouping_options-type-manganese' },
			{ value: 'grind', render: 'material_grouping_options-type-grind' },
			{ value: 'rma', render: 'material_grouping_options-type-rma' },
			{ value: 'stone', render: 'material_grouping_options-type-stone' },
			{ value: 'device', render: 'material_grouping_options-type-device' },
			{ value: 'ester', render: 'material_grouping_options-type-ester' },
			{ value: 'sugar', render: 'material_grouping_options-type-sugar' },
			{ value: 'iron', render: 'material_grouping_options-type-iron' },
			{ value: 'ketone', render: 'material_grouping_options-type-ketone' },
			{ value: 'gel', render: 'material_grouping_options-type-gel' },
			{ value: 'alloy', render: 'material_grouping_options-type-alloy' },
			{ value: 'skill', render: 'material_grouping_options-type-skill' },
			{ value: 'chip', render: 'material_grouping_options-type-chip' },
		],
		groups: {},
	},
	tier: {
		render: 'material_grouping_options-tier',
		field: 'tier',
		options: [
			{ value: 'T5', render: 'material_grouping_options-tier-T5' },
			{ value: 'T4', render: 'material_grouping_options-tier-T4' },
			{ value: 'T3', render: 'material_grouping_options-tier-T3' },
			{ value: 'T2', render: 'material_grouping_options-tier-T2' },
			{ value: 'T1', render: 'material_grouping_options-tier-T1' },
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
material_grouping_options.type.groups.chip.render = 'material_grouping_options-type-catalyst';
const profession_chip_index = material_grouping_options.type.groups.chip.list.splice(1, 3 * 8);
const professions = [
	{ value: 'pioneer', render: 'material_grouping_options-type-pioneer' },
	{ value: 'warrior', render: 'material_grouping_options-type-warrior' },
	{ value: 'tank', render: 'material_grouping_options-type-tank' },
	{ value: 'sniper', render: 'material_grouping_options-type-sniper' },
	{ value: 'caster', render: 'material_grouping_options-type-caster' },
	{ value: 'medic', render: 'material_grouping_options-type-medic' },
	{ value: 'support', render: 'material_grouping_options-type-support' },
	{ value: 'special', render: 'material_grouping_options-type-special' },
];
professions.forEach(({ value, render }, index) => {
	material_grouping_options.type.groups[`chip_${value}`] = {
		render: `${render}_chip`,
		list: profession_chip_index.splice(0, 3),
	};
});

export {
	material_grouping_options,
	material_list,
};
