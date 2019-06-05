const sumShortage = (stock, summary, compound_materials) => {
	const shortage = {};

	Object.entries(summary).forEach(([material_id, requirement]) => {
		shortage[material_id] = Math.max(requirement - (stock[material_id] || 0), 0);
	});

	compound_materials.forEach(({ id }) => {
		shortage[id] = shortage[id] ? `合成${shortage[id]}个` : 0;
	});

	return shortage;
};

export default sumShortage;
