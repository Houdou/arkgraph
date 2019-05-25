import operators from './operators.json';

const OPERATORS = operators.map(o => o);

export default class Operator {
	constructor(name, attributes) {
		this.name = name;
		this.attributes = attributes;
	}
}
export {
	OPERATORS,
};
