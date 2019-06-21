import React from 'preact';
import style from './style';
import cn from 'classnames';

import { LEVELS } from '../../models/Levels';
import PenguinLink from '../penguinLink';

const excluding_list = [
	'LS-1',
	'LS-2',
	'LS-3',
	'LS-4',
	'LS-5',
	'AP-1',
	'AP-2',
	'AP-3',
	'AP-4',
	'AP-5',
	'CE-1',
	'CE-2',
	'CE-3',
	'CE-4',
	'CE-5',
	'PR-A-1',
	'PR-B-1',
	'PR-C-1',
	'PR-D-1',
	'PR-A-2',
	'PR-B-2',
	'PR-C-2',
	'PR-D-2',
];

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
				{excluding_list.includes(level)
					? (<span>{level}</span>)
					: (<PenguinLink category="stage" id={unique_id} render={level} color="white" />)
				}
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
