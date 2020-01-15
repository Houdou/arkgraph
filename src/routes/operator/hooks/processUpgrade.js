import { OPERATORS } from '../../../models/Operators';
import { ATTRIBUTES } from '../../../models/Attributes';
import exp from '../../../models/exp.json';
import processRecord from '../../../models/processRecord';

const clampRange = (value, min, max) => Math.max(Math.min(value || 0, max), min);

const processUpgrade = ({
	operator_id,
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
	const operator = OPERATORS.find(o => o.unique_id === operator_id);

	const upgrades = [];
	if (operator) {
		// Elite rank
		current_elite = clampRange(current_elite, 0, operator.meta.max_elite_rank);
		target_elite = clampRange(target_elite, current_elite, operator.meta.max_elite_rank);
		const elite_rank_change = target_elite !== current_elite;

		// Level
		current_level = clampRange(current_level, 1, exp.maxLevel[operator.rarity][current_elite]);
		target_level = clampRange(target_level, elite_rank_change ? 1 : current_level, exp.maxLevel[operator.rarity][target_elite]);

		// Skill level
		current_all_skill = clampRange(current_all_skill, 1, 7);
		target_all_skill = clampRange(target_all_skill, current_all_skill, 7);

		// Master skill 3
		if (operator.meta.max_master_skills >= 3) {
			current_master_skill_3 = clampRange(current_master_skill_3, 0, 3);
			target_master_skill_3 = clampRange(target_master_skill_3, current_master_skill_3, 3);
			if (target_master_skill_3 > 0) {
				target_all_skill = 7;
				target_elite = 2;
			}
		} else {
			current_master_skill_3 = 0;
			target_master_skill_3 = 0;
		}

		// Master skill 2
		if (operator.meta.max_master_skills >= 2) {
			current_master_skill_2 = clampRange(current_master_skill_2, 0, 3);
			target_master_skill_2 = clampRange(target_master_skill_2, current_master_skill_2, 3);
			if (target_master_skill_2 > 0) {
				target_all_skill = 7;
				target_elite = 2;
			}
		} else {
			current_master_skill_2 = 0;
			target_master_skill_2 = 0;
		}
		if (
			operator.meta.max_master_skills >= 1 &&
			!(operator.master_skills[0].upgrades.every(({ materials }) => materials.length === 0))
		) {
			current_master_skill_1 = clampRange(current_master_skill_1, 0, 3);
			target_master_skill_1 = clampRange(target_master_skill_1, current_master_skill_1, 3);
			if (target_master_skill_1 > 0) {
				target_all_skill = 7;
				target_elite = 2;
			}
		} else {
			current_master_skill_1 = 0;
			target_master_skill_1 = 0;
		}

		if (target_all_skill > 4) {
			target_elite = clampRange(target_elite, 1, operator.meta.max_elite_rank);
		}

		// level
		if (elite_rank_change) {
			for (let elite_rank = current_elite; elite_rank <= target_elite; elite_rank++) {
				if (elite_rank === current_elite) {
					if (current_level !== exp.maxLevel[operator.rarity][elite_rank]) {
						upgrades.push(processRecord({
							operator_id,
							attribute: ATTRIBUTES[`LEVEL_ELITE_${elite_rank}`],
							current: current_level,
							target: exp.maxLevel[operator.rarity][elite_rank],
						}, true));
					}
					continue;
				} else {
					upgrades.push(processRecord({
						operator_id,
						attribute: ATTRIBUTES.ELITE_RANK,
						current: elite_rank - 1,
						target: elite_rank,
					}));
				}
				if (elite_rank === target_elite) {
					if (target_level !== 1) {
						upgrades.push(processRecord({
							operator_id,
							attribute: ATTRIBUTES[`LEVEL_ELITE_${elite_rank}`],
							current: 1,
							target: target_level,
						}, true));
					}
				} else {
					upgrades.push(processRecord({
						operator_id,
						attribute: ATTRIBUTES[`LEVEL_ELITE_${elite_rank}`],
						current: 1,
						target: exp.maxLevel[operator.rarity][elite_rank],
					}, true));
				}
			}
		} else if (current_level !== target_level) {
			upgrades.push(processRecord({
				operator_id,
				attribute: ATTRIBUTES[`LEVEL_ELITE_${target_elite}`],
				current: current_level,
				target: target_level,
			}, true));
		}

		// skill level
		for (let all_skill = current_all_skill; all_skill < target_all_skill; all_skill++) {
			upgrades.push(processRecord({
				operator_id,
				attribute: ATTRIBUTES.SKILL_LEVEL,
				current: all_skill,
				target: all_skill + 1,
			}));
		}

		for (let master_skill_1 = current_master_skill_1; master_skill_1 < target_master_skill_1; master_skill_1++) {
			upgrades.push(processRecord({
				operator_id,
				attribute: ATTRIBUTES.MASTER_SKILL_1,
				current: master_skill_1,
				target: master_skill_1 + 1,
			}));
		}

		for (let master_skill_2 = current_master_skill_2; master_skill_2 < target_master_skill_2; master_skill_2++) {
			upgrades.push(processRecord({
				operator_id,
				attribute: ATTRIBUTES.MASTER_SKILL_2,
				current: master_skill_2,
				target: master_skill_2 + 1,
			}));
		}

		for (let master_skill_3 = current_master_skill_3; master_skill_3 < target_master_skill_3; master_skill_3++) {
			upgrades.push(processRecord({
				operator_id,
				attribute: ATTRIBUTES.MASTER_SKILL_3,
				current: master_skill_3,
				target: master_skill_3 + 1,
			}));
		}
	}
	return {
		operator_id,
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
};

export default processUpgrade;
