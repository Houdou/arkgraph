export default class Requirement {
	constructor(operator, current_level, material_requirements) {
		this.operator = operator;
		this.current_level = current_level;
		this.material_requirements = material_requirements;
	}

	get next_level() {
		return this.current_level + 1;
	}
}
