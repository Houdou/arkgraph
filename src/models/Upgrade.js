export default class Upgrade {
	constructor({ operator, attribute, current, target, hidden }) {
		this.operator = operator;
		this.attribute = attribute;
		this.current = current;
		this.target = target;
		this.hidden = Boolean(hidden);
	}
}
