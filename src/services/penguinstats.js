const URL = 'https://penguin-stats.io/PenguinStats/api/result/matrix?show_item_details=false&show_stage_details=false';

const fetchStatMatrix = async () => {
	let matrix = [];
	try {
		const response = await fetch(
			URL,
			{
				method: 'GET',
				mode: 'cors',
			}
		);
		({ matrix } = await response.json());
	} catch (err) {
		return [];
	}
	return matrix;
};

export default fetchStatMatrix;
