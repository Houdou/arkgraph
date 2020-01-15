export default class Upgrade {
	constructor({ operator_id, attribute, current, target, hidden }) {
		this.operator_id = operator_id;
		this.attribute = attribute;
		this.current = current;
		this.target = target;
		this.hidden = Boolean(hidden);
	}
}
