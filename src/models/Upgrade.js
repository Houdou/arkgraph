export default class Upgrade {
	constructor(operator, attribute, from, to, requirements) {
		this.operator = operator;
		this.attribute = attribute;
		this.from = from;
		this.to = to;
		this.requirements = requirements;
	}
}
