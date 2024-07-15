import { MATERIALS } from '../../models/Resources';

const generateArkPlannerData = (summary, stock) => MATERIALS.map(
	({ id, unique_id, name }) => ({
		id: unique_id,
		name,
		need: summary[id] || 0,
		have: stock[id] || 0,
	})
);

export default generateArkPlannerData;