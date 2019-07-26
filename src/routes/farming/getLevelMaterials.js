import { RESOURCES } from '../../models/Resources';
export const getLevelMaterials = (level) => {
	if (!level) {
		return {
			resources: [],
			normal_drop: [],
			special_drop: [],
			extra_drop: [],
		};
	}

	let index = 0;
	const resources = [];
	const normal_drop = [];
	const special_drop = [];
	const extra_drop = [];
	level.normal_drop.forEach(m => {
		resources.push(RESOURCES[m.resource]);
		normal_drop.push(index++);
	});
	level.special_drop.forEach(m => {
		resources.push(RESOURCES[m.resource]);
		special_drop.push(index++);
	});
	level.extra_drop.forEach(m => {
		resources.push(RESOURCES[m.resource]);
		extra_drop.push(index++);
	});

	return {
		resources,
		normal_drop,
		special_drop,
		extra_drop,
	};
};
