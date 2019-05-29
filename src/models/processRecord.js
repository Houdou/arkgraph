import { OPERATORS } from './Operators';
import { ATTRIBUTES } from './Attributes';

const clampRange = (value, min, max) => Math.max(Math.min(value || 0, max), min);

const processRecord = ({ operator: operator_name, attribute, current, target }) => {
	const operator = OPERATORS.find(o => o.name === operator_name);
	// Default
	if (operator_name && !attribute) {
		attribute = ATTRIBUTES.ELITE_LEVEL;
	}

	let requirements = [];
	if (operator) {
		switch (attribute) {
			case ATTRIBUTES.LEVEL:
				// No date yet
				break;
			case ATTRIBUTES.ELITE_LEVEL:
				current = clampRange(current, 0, operator.meta.max_elite_tier - 1);
				requirements = operator.elites[current].materials;
				break;
			case ATTRIBUTES.SKILL_LEVEL:
				current = clampRange(current, 1, 7);
				requirements = operator.skills[current - 1].materials;
				break;
			case ATTRIBUTES.MASTER_SKILL_1:
				current = clampRange(current, 0, 2);
				requirements = operator.master_skills[0].upgrades[current].materials;
				break;
			case ATTRIBUTES.MASTER_SKILL_2:
				if (operator.meta.max_master_skills >= 1) {
					current = clampRange(current, 0, 2);
					requirements = operator.master_skills[1].upgrades[current].materials;
				} else {
					attribute = ATTRIBUTES[`MASTER_SKILL_${operator.meta.max_master_skills}`];
				}
				break;
			case ATTRIBUTES.MASTER_SKILL_3:
				if (operator.meta.max_master_skills >= 2) {
					current = clampRange(current, 0, 2);
					requirements = operator.master_skills[2].upgrades[current].materials;
				} else {
					attribute = ATTRIBUTES[`MASTER_SKILL_${operator.meta.max_master_skills + 1}`];
				}
				break;
			default:
				current = 0;
				attribute = ATTRIBUTES.ELITE_LEVEL;
				break;
		}
	}
	return {
		operator: operator_name,
		attribute,
		current,
		target,
		requirements,
	};
};


export default processRecord;
