import processRecord from './processRecord';

const sumRequirements = (records) => [].concat(...records.map(record => processRecord(record).requirements))
	.reduce((prev, next) => {
		prev[next.resource] = prev[next.resource] || 0;
		prev[next.resource] += next.quantity;
		return prev;
	}, {});

export default sumRequirements;
