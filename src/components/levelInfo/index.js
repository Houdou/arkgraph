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
}) => {
	const { energy } = LEVELS.find(l => l.level === level) || { energy: '---' };
	const { probability, quantity } = parseProbability(drop_probability);
	return (
		<div class={style.source_level}>
			<span class={style.level}>{level}</span>
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
			>{quantity || probability}</span>
			<span class={cn(style.energy, style.black)}>
			  <img src="../../assets/materials/AP.png" alt="AP" />
				<span>{energy}</span>
			</span>
		</div>
	);
};

export default ArkLevelInfo;
