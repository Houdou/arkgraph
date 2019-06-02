import { useState } from 'preact/hooks';

import processUpgrade from './processUpgrade';

const useOperatorUpgrade = (init_values) => {
	const init_record = Object.assign(
		{
			operator: null,
			current_elite: 0,
			target_elite: 0,
			current_level: 1,
			target_level: 1,
			current_all_skill: 1,
			target_all_skill: 1,
			current_master_skill_1: 0,
			target_master_skill_1: 0,
			current_master_skill_2: 0,
			target_master_skill_2: 0,
			current_master_skill_3: 0,
			target_master_skill_3: 0,
			upgrades: [],
		},
		init_values,
	);
	const [operatorUpgrade, setOperatorUpgrade_raw] = useState(init_record);

	const setOperatorUpgrade = (to_update) => {
		const processed_upgrade = processUpgrade(to_update);
		console.log('to_update');
		console.log(to_update);
		setOperatorUpgrade_raw(processed_upgrade);
		console.log('processed_upgrade');
		console.log(processed_upgrade);
		return processed_upgrade;
	};

	const setOperator = (operator) => setOperatorUpgrade({
		...operatorUpgrade,
		operator,
	});
	const setAttribute = (attribute, value) => setOperatorUpgrade({
		...operatorUpgrade,
		[attribute]: value,
	});

	return {
		operatorUpgrade,
		setOperator,
		setCurrentElite: value => setAttribute('current_elite', value),
		setTargetElite: value => setAttribute('target_elite', value),
		setCurrentLevel: value => setAttribute('current_level', value),
		setTargetLevel: value => setAttribute('target_level', value),
		setCurrentAllSkill: value => setAttribute('current_all_skill', value),
		setTargetAllSkill: value => setAttribute('target_all_skill', value),
		setCurrentMasterSkill_1: value => setAttribute('current_master_skill_1', value),
		setTargetMasterSkill_1: value => setAttribute('target_master_skill_1', value),
		setCurrentMasterSkill_2: value => setAttribute('current_master_skill_2', value),
		setTargetMasterSkill_2: value => setAttribute('target_master_skill_2', value),
		setCurrentMasterSkill_3: value => setAttribute('current_master_skill_3', value),
		setTargetMasterSkill_3: value => setAttribute('target_master_skill_3', value),
	};
};

export default useOperatorUpgrade;
