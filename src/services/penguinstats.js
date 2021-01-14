const URL = 'https://penguin-stats.io/PenguinStats/api/v2/result/matrix';

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
