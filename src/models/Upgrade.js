export default class Upgrade {
	constructor(operator, attribute, current, target) {
		this.operator = operator;
		this.attribute = attribute;
		this.current = current;
		this.target = target;
	}
}
