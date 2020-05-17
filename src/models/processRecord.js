import { OPERATORS } from './Operators';
import { ATTRIBUTES } from './Attributes';
import exp from './exp.json';
import sumLevelUpRequirement from './sumLevelUpRequirement';

const clampRange = (value, min, max) => Math.max(Math.min(value || 0, max), min);

const processRecord = ({ operator_id, attribute, current, target, hidden },
	allow_same_level = false
) => {
	const operator = OPERATORS.find(o => o.unique_id === operator_id);
	// Default
	if (operator_id && !attribute) {
		attribute = ATTRIBUTES.LEVEL_ELITE_0;
	}

	let requirements = [];
	if (operator) {
		const unavailable_attributes = [];

		if (operator.meta.max_elite_rank < 2) {
			unavailable_attributes.push(ATTRIBUTES.LEVEL_ELITE_2);
		}
		if (operator.meta.max_master_skills < 3) {
			unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_3);
		}
		if (operator.meta.max_master_skills < 2) {
			unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_2);
		}
		if (operator.meta.max_master_skills === 1) {
			if (operator.master_skills[0].upgrades.every(({ materials }) => materials.length === 0)){
				unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_1);
			}
		}

		switch (attribute) {
			case ATTRIBUTES.LEVEL_ELITE_0:
				current = clampRange(current, 1, allow_same_level ? exp.maxLevel[operator.rarity][0] : exp.maxLevel[operator.rarity][0] - 1);
				target = clampRange(target, allow_same_level ? current : current + 1, exp.maxLevel[operator.rarity][0]);
				requirements = sumLevelUpRequirement(operator.rarity, 0, current, target);
				break;
			case ATTRIBUTES.LEVEL_ELITE_1:
				current = clampRange(current, 1, allow_same_level ? exp.maxLevel[operator.rarity][1] : exp.maxLevel[operator.rarity][1] - 1);
				target = clampRange(target, allow_same_level ? current : current + 1, exp.maxLevel[operator.rarity][1]);
				requirements = sumLevelUpRequirement(operator.rarity, 1, current, target);
				break;
			case ATTRIBUTES.LEVEL_ELITE_2:
				if (unavailable_attributes.includes(attribute)) {
					attribute = ATTRIBUTES.LEVEL_ELITE_1;
					current = 1;
					target = 2;
				} else {
					current = clampRange(current, 1, allow_same_level ? exp.maxLevel[operator.rarity][2] : exp.maxLevel[operator.rarity][2] - 1);
					target = clampRange(target, allow_same_level ? current : current + 1, exp.maxLevel[operator.rarity][2]);
					requirements = sumLevelUpRequirement(operator.rarity, 2, current, target);
				}
				break;
			case ATTRIBUTES.ELITE_RANK:
				current = clampRange(current, 0, operator.meta.max_elite_rank - 1);
				target = current + 1;
				requirements = operator.elites[current].materials;
				break;
			case ATTRIBUTES.SKILL_LEVEL:
				current = clampRange(current, 1, 6);
				target = current + 1;
				requirements = operator.skills[current - 1].materials;
				break;
			case ATTRIBUTES.MASTER_SKILL_1:
				if (unavailable_attributes.includes(attribute)) {
					attribute = ATTRIBUTES.SKILL_LEVEL;
					current = 1;
					target = 2;
				} else {
					current = clampRange(current, 0, 2);
					target = current + 1;
					requirements = operator.master_skills[0].upgrades[current].materials;
				}
				break;
			case ATTRIBUTES.MASTER_SKILL_2:
				if (unavailable_attributes.includes(attribute)) {
					attribute = ATTRIBUTES.SKILL_LEVEL;
					current = 1;
					current = 2;
				} else {
					current = clampRange(current, 0, 2);
					target = current + 1;
					requirements = operator.master_skills[1].upgrades[current].materials;
				}
				break;
			case ATTRIBUTES.MASTER_SKILL_3:
				if (unavailable_attributes.includes(attribute)) {
					attribute = ATTRIBUTES.SKILL_LEVEL;
					current = 1;
					current = 2;
				} else {
					current = clampRange(current, 0, 2);
					target = current + 1;
					requirements = operator.master_skills[2].upgrades[current].materials;
				}
				break;
			default:
				current = 1;
				target = 2;
				attribute = ATTRIBUTES.LEVEL_ELITE_0;
				hidden = false;
				break;
		}
	}
	if (operator_id) {
		global.last_operator = operator_id;
	}
	if (attribute) {
		global.last_attribute = attribute;
	}
	return {
		operator_id,
		attribute,
		current,
		target,
		hidden,
		requirements,
	};
};


export default processRecord;
