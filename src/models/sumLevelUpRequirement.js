import exp from './exp.json';
import { MONEY, EXP_TAPES } from './Resources';

const sumTapeRequirements = (required_exp) => {
	const summary = [];

	if (required_exp <= 0) {
		return [];
	}
	const rounded_exp = Math.ceil(required_exp/200)*200;
	let remain_exp = rounded_exp;
	EXP_TAPES.forEach(tape => {
		let requirement = {
			resource: tape.id,
			quantity: 0,
		};
		while (remain_exp >= tape.value) {
			requirement.quantity += 1;
			remain_exp -= tape.value;
		}
		summary.push(requirement);
	});

	return summary;
};

const sumLevelUpRequirements = (rarity, elite_rank, current, target) => {
	const summary = [];
	try {
		// Lungmen coin
		let sum_coin = 0;
		for (let i = current - 1, step = 0; i < target - 1 && step < 90; i++, step++) {
			sum_coin += exp.upgradeCoinRequirement[elite_rank][i];
		}
		summary.push({
			resource: MONEY.id,
			quantity: sum_coin,
		});

		// Exp cost
		let sum_exp = 0;
		for (let i = current - 1, step = 0; i < target - 1 && step < 90; i++, step++) {
			sum_exp += exp.upgradeExpRequirement[elite_rank][i];
		}
		summary.push(...sumTapeRequirements(sum_exp));

		return summary;
	} catch (err) {
		console.error(err);
		return [];
	}
};

export default sumLevelUpRequirements;
