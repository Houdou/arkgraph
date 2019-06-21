import processRecord from './processRecord';
import { RESOURCES } from './Resources';

const sumRequirements = (records, stock, compound_materials) => {
	const summary = [].concat(...records.map(record => processRecord(record).requirements))
		.reduce((prev, next) => {
			prev[next.resource] = prev[next.resource] || 0;
			prev[next.resource] += next.quantity;
			return prev;
		}, {});

	compound_materials
		.map(({ id: material_id }) => RESOURCES[material_id] || null)
		.filter(Boolean)
		.sort((prev, next) => prev.tier < next.tier ? 1 : -1)
		.forEach(({ id: material_id, formula }) => {
			Object.entries(formula).forEach(([ingredient_material_id, ingredient_quantity]) => {
				summary[ingredient_material_id] = (summary[ingredient_material_id] || 0) + (Math.max((summary[material_id] || 0) - (stock[material_id] || 0), 0)) * ingredient_quantity;
			});
		});

	return summary;
};

export default sumRequirements;
