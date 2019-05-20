import MATERIALS from './Materials';

export default class Requirement {
	constructor(operator, current_level, material_requirements) {
		this.operator = operator;
		this.current_level = current_level;
		this.material_requirements = material_requirements;
	}

	get next_level() {
		return this.current_level + 1;
	}

	get materials() {
		return MATERIALS.map(m => {
			const required_number = this.material_requirements[m.id] || 0;
			return {
				id: m.id,
				name: m.name,
				required_number,
			};
		});
	}
}
