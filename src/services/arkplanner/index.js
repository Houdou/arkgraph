const URL = 'https://planner.penguin-stats.io/plan';

const callPlanner = async ({ required, owned }, options = {}) => {
	let result = null;
	try {
		const response = await fetch(
			URL,
			{
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					required,
					owned,
					...options,
				}),
			},
		);
		result = await response.json();
	} catch (err) {
		return null;
	}
	return result;
};

export default callPlanner;
