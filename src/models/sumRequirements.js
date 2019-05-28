import processRecord from './processRecord';
import { RESOURCES } from './Resources';

const sumRequirements = (records, compound_materials) => {
	const summary = [].concat(...records.map(record => processRecord(record).requirements))
		.reduce((prev, next) => {
			prev[next.resource] = prev[next.resource] || 0;
			prev[next.resource] += next.quantity;
			return prev;
		}, {});

	compound_materials
		.map(({ id: material_id }) => RESOURCES[material_id] || null)
		.filter(Boolean)
		.sort((prev, next) => prev.id < next.id ? 1 : -1)
		.forEach(({ id: material_id, formula }) => {
			Object.entries(formula).forEach(([ingredient_material_id, ingredient_quantity]) => {
				summary[ingredient_material_id] = (summary[ingredient_material_id] || 0) + (summary[material_id] || 0) * ingredient_quantity;
			});
			summary[material_id] = summary[material_id] ? `合成${summary[material_id]}个` : 0;
		});

	return summary;
};

export default sumRequirements;
