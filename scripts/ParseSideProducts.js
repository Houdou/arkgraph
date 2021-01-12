const pinyin = require('pinyin');
const { workshopFormulas } = require('./excels/building_data.json');
const MapItem = require('./mapping.json');
const game_data = require('./excels/gamedata_const.json');

const FormulaTypes = [
	'F_BUILDING', // Building material
	'F_EVOLVE', // Materials
	'F_SKILL', // Skill books
	'F_ASC', // Chips
];

const parseCosts = costs => costs
	.map(({ id, count }) => ({
		resource: MapItem[id],
		quantity: count,
	}));

const parseExtraOutcomeGroup = (extraOutcomeGroup, baseRate = 0.1) => {
	const sum_weight = extraOutcomeGroup
		.map(({ weight }) => weight)
		.reduce((a, b) => a + b, 0);
	const side_products = extraOutcomeGroup
		.map(({ weight, itemId, itemCount }) => ({
			probability: Math.round(baseRate * weight / sum_weight * 100000) / 1000,
			resource: MapItem[itemId],
			quantity: itemCount,
		}));
	return side_products;
};

const parseFormula = (formula) => {
	const {
		formulaType,
		itemId,
		apCost,
		costs,
		extraOutcomeRate,
		extraOutcomeGroup,
	} = formula;
	if (formulaType !== 'F_EVOLVE') {
		return null;
	}

	const material_id = MapItem[itemId];
	const compound_formula = parseCosts(costs);
	const side_products = parseExtraOutcomeGroup(extraOutcomeGroup, extraOutcomeRate);

	const compound_data = {
		material_id,
		formula: compound_formula,
		side_products,
		ap_cost: apCost / 360000,
	};

	return compound_data;
};

const SIDE_PRODUCTS = Object.entries(workshopFormulas)
	.map(([id, value], index) => parseFormula(value))
	.filter(Boolean);

require('fs').writeFileSync(require('path').resolve(__dirname, '../src/models', 'compounds.json'), JSON.stringify(SIDE_PRODUCTS, null, 2));
