import { EXP, EXP_TAPES } from './Resources';

const sumShortage = (stock, summary, compound_materials) => {
	const shortage = {};

	Object.entries(summary).forEach(([material_id, requirement]) => {
		shortage[material_id] = Math.max(requirement - (stock[material_id] || 0), 0);
	});

	const exp_stock = EXP_TAPES
		.map(tape => (stock[tape.id] || 0) * tape.value)
		.reduce((a, b) => a + b, 0);
	shortage[EXP.id] = Math.max(summary[EXP.id] - exp_stock, 0);

	compound_materials.forEach(({ id }) => {
		shortage[id] = shortage[id] ? `合成${shortage[id]}个` : 0;
	});

	return shortage;
};

export default sumShortage;
