const sumShortage = (stock, summary) => {
	const shortage = {};

	Object.entries(summary).forEach(([material_id, requirement]) => {
		shortage[material_id] = Math.max(requirement - (stock[material_id] || 0), 0);
	});

	return shortage;
};

export default sumShortage;
