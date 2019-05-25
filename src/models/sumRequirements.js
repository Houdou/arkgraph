import processRecord from './processRecord';

const sumRequirements = (data) => data.map(record => processRecord(record).requirements)
	.flat()
	.reduce((prev, next) => {
		prev[next.resource] = prev[next.resource] || 0;
		prev[next.resource] += next.quantity;
		return prev;
	}, {});

export default sumRequirements;
