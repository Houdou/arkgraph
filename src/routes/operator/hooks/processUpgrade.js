import { OPERATORS } from '../../../models/Operators';
import { ATTRIBUTES } from '../../../models/Attributes';

const clampRange = (value, min, max) => Math.max(Math.min(value || 0, max), min);

const processUpgrade = ({
	operator: operator_name,
	current_elite,
	target_elite,
	current_level,
	target_level,
	current_all_skill,
	target_all_skill,
	current_master_skill_1,
	target_master_skill_1,
	current_master_skill_2,
	target_master_skill_2,
	current_master_skill_3,
	target_master_skill_3,
}) => {
	const operator = OPERATORS.find(o => o.name === operator_name);

	let upgrades = [];
	if (operator) {
		const unavailable_attributes = [];

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
	}
	const result = {
		operator: operator_name,
		current_elite,
		target_elite,
		current_level,
		target_level,
		current_all_skill,
		target_all_skill,
		current_master_skill_1,
		target_master_skill_1,
		current_master_skill_2,
		target_master_skill_2,
		current_master_skill_3,
		target_master_skill_3,
		upgrades,
	};
	return result;
};

export default processUpgrade;
