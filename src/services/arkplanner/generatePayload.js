import { MATERIALS } from '../../models/Resources';

const generateArkPlannerData = (summary, stock) => MATERIALS.map(
	({ id, name }) => ({
		name,
		need: summary[id] || 0,
		have: stock[id] || 0,
	})
);

export default generateArkPlannerData;