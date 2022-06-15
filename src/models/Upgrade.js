export default class Upgrade {
	constructor({ operator_id, attribute, current, target, hidden, selected }) {
		this.operator_id = operator_id;
		this.attribute = attribute;
		this.current = current;
		this.target = target;
		this.hidden = Boolean(hidden);
		this.selected = Boolean(selected);
	}
}
