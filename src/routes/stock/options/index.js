import { MONEY, PURCHASE_CREDIT, MOD_TOKENS, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../../models/Resources';

import item_i18n from '../../../i18n/items.json';
import { locale as available_locale } from '../../../i18n/locale';

const LANG = Object.keys(available_locale);

const default_material_list = [
	MONEY,
	PURCHASE_CREDIT,
	...MOD_TOKENS,
	...EXP_TAPES,
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
];

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
			{ value: 'crystal', render: 'material_grouping_options-type-crystal' },
			{ value: 'solvent', render: 'material_grouping_options-type-solvent' },
			{ value: 'cuttingfluid', render: 'material_grouping_options-type-cuttingfluid' },
			{ value: 'salt', render: 'material_grouping_options-type-salt' },
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

const sorted_material_list_by_locale = {};
const material_grouping_options_by_locale = {};
LANG.forEach(locale => {
	const sorted_material_list = default_material_list.map(e => {
		const material_i18n = item_i18n[e.id];
		return {
			...e,
			sortId: material_i18n && material_i18n[locale].sortId || 999999999,
		};
	}).sort((a, b) => a.sortId - b.sortId);
	sorted_material_list_by_locale[locale] = sorted_material_list;

	material_grouping_options_by_locale[locale] = getMaterialGroupingOptions(sorted_material_list);
});

function getMaterialGroupingOptions(material_list) {
	const i18n_material_grouping_options = JSON.parse(JSON.stringify(material_grouping_options));

	const indexed_material_list = material_list.map((m, index) => ({
		material: m,
		index,
	}));

	Object.entries(i18n_material_grouping_options)
		.forEach(([key, data]) => {
			if (!data.field) {
				return;
			}
			data.options.forEach(({ value, render }) => {
				i18n_material_grouping_options[key].groups[value] =
				{
					render,
					list: indexed_material_list
						.filter(({ material }) => material[data.field] === value)
						.map(({ index }) => index),
				};
			});
		});

	// Special handling for chip
	i18n_material_grouping_options.type.groups.chip.render = 'material_grouping_options-type-catalyst';
	i18n_material_grouping_options.type.groups.chip.list = [
		indexed_material_list.find(({ material }) => material.id === 'O-4-1').index,
	];

	const profession_chip_index = indexed_material_list
		.filter(({ material }) => material.id.startsWith('C-'));
	const professions = [
		{ id_surfix: '1', value: 'pioneer', render: 'material_grouping_options-type-pioneer' },
		{ id_surfix: '2', value: 'warrior', render: 'material_grouping_options-type-warrior' },
		{ id_surfix: '3', value: 'tank', render: 'material_grouping_options-type-tank' },
		{ id_surfix: '4', value: 'sniper', render: 'material_grouping_options-type-sniper' },
		{ id_surfix: '5', value: 'caster', render: 'material_grouping_options-type-caster' },
		{ id_surfix: '6', value: 'medic', render: 'material_grouping_options-type-medic' },
		{ id_surfix: '7', value: 'support', render: 'material_grouping_options-type-support' },
		{ id_surfix: '8', value: 'special', render: 'material_grouping_options-type-special' },
	];

	professions.forEach(({ id_surfix, value, render }) => {
		i18n_material_grouping_options.type.groups[`chip_${value}`] = {
			render: `${render}_chip`,
			list: profession_chip_index.filter(({ material }) => material.id.endsWith(id_surfix)).map(({ index }) => index),
		};
	});

	return i18n_material_grouping_options;
}

const material_list = sorted_material_list_by_locale.zh_CN;

export {
	material_grouping_options,
	material_list,
	sorted_material_list_by_locale,
	material_grouping_options_by_locale,
};
