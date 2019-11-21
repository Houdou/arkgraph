import { EXP, RESOURCES } from './Resources';

export const FULFILLMENT_STATUS = {
	FULFILLED: 'FULFILLED',
	COMPOUND: 'COMPOUND',
	UNSATISFIED: 'UNSATISFIED',
};

const checkResourceEnough = (
	stock,
	resource,
	quantity,
) => (stock[resource] || 0) >= quantity;

const checkFulFillment = ({
	records,
	stock,
	compound_materials,
}) => {
	const fulfilled_records = records.map(record => {
		if (record.requirements && record.requirements.length > 0) {
			if (record.requirements.every(
				({ resource, quantity }) => resource === EXP.id || checkResourceEnough(stock, resource, quantity)
			)) {
				return FULFILLMENT_STATUS.FULFILLED;
			}
			const checklist = [];
			const accumulated_requirements = {};
			record.requirements.forEach(
				({ resource, quantity }) => {
					checklist.push({
						resource,
						quantity,
					});
					accumulated_requirements[resource] = quantity;
				}
			);

			let compoundable = true;
			for (const item of checklist) {
				const {
					resource,
					quantity,
				} = item;
				if (resource === EXP.id || checkResourceEnough(stock, resource, accumulated_requirements[resource])) {
					continue;
				} else if (compound_materials.find(({ id }) => id === resource)) {
					Object.entries(RESOURCES[resource].formula).forEach(([ingredient_resource, ingredient_quantity]) => {
						checklist.push({
							resource: ingredient_resource,
							quantity: (quantity - (stock[resource] || 0)) * ingredient_quantity,
						});
						accumulated_requirements[ingredient_resource] = accumulated_requirements[ingredient_resource] || 0;
						accumulated_requirements[ingredient_resource] += (quantity - (stock[resource] || 0)) * ingredient_quantity;
					});
					continue;
				} else {
					compoundable = false;
					break;
				}
			}
			if (compoundable) {
				return FULFILLMENT_STATUS.COMPOUND;
			}
		}
		return FULFILLMENT_STATUS.UNSATISFIED;
	});
	return fulfilled_records;
};

export default checkFulFillment;