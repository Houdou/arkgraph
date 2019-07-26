import React from 'preact';
import style from './style';
import cn from 'classnames';

import { LEVELS } from '../../models/Levels';

const parseProbability = (probability) => {
	const matching = /^(.+)\[([\d~]+)\]$/.exec(probability);
	if (matching) {
		const [, prob, quantity] = matching;
		return {
			probability: prob,
			quantity,
		};
	}
	return { probability };
};

const ArkLevelInfo = ({
	level,
	drop_probability,
	drops = [],
}) => {
	const { energy, unique_id } = LEVELS.find(l => l.level === level) || { energy: '---' };

	const drop = drops.find(({ stageId }) => stageId === String(unique_id));

	const { probability, quantity } = parseProbability(drop_probability);


	return (
		<div class={style.source_level}>
			<span class={style.level}>
				<a class={style.level_link} href={`/farming/${level}`}>{level}</a>
			</span>
			<span class={cn(
				style.drop_probability,
				{
					[style.black]: probability === '固定',
					[style.dark_grey]: probability === '大概率',
					[style.grey]: probability === '中概率',
					[style.white]: probability === '小概率',
					[style.red]: probability === '罕见',
				}
			)}
			>
				{
					drop
						? (`${~~(drop.quantity / drop.times * 1000) / 10}%`)
						: (quantity || probability)
				}
			</span>
			<span class={cn(style.energy, style.black)}>
			  <img src="../../assets/materials/AP.png" alt="AP" />
				<span>{energy}</span>
				{
					drop && (
						<span class={cn(style.energy, style.energy_expectaion, style.black)}>
							{~~(energy / (drop.quantity / drop.times) * 10) / 10}
						</span>
					)
				}
			</span>
		</div>
	);
};

export default ArkLevelInfo;
