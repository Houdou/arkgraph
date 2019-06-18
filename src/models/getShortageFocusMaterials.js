import { EXP, EXP_TAPES } from './Resources';

const excluding_list = [
	EXP,
	...EXP_TAPES,
].map(({ id }) => id);

const getShortageFocusMaterials = (shortage) => {
	let focus_materials = [];

	Object.entries(shortage).forEach(([resource, quantity]) => {
		if (Number(quantity) > 0 && !excluding_list.includes(resource)) {
			focus_materials.push({
				id: resource,
				options: {},
			});
		}
	});

	return focus_materials;
};

export default getShortageFocusMaterials;
