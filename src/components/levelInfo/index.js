import React from 'preact';
import style from './style';
import cn from 'classnames';

const ArkLevelInfo = ({
	level,
	drop_rarity,
	energy,
}) => (
	<div class={style.source_level}>
		<span class={style.level}>{level}</span>
		<span class={cn(
			style.drop_rarity,
			{
				[style.black]: drop_rarity === '固定',
				[style.dark_grey]: drop_rarity === '大概率',
				[style.grey]: drop_rarity === '中概率',
				[style.white]: drop_rarity === '小概率',
				[style.red]: drop_rarity === '罕见',
			}
		)}
		>{drop_rarity}</span>
		<span class={cn(style.energy, style.black)}>
		  <img src="../../assets/materials/AP.png" alt="AP" />
			<span>{` -${energy}`}</span>
		</span>
	</div>
);

export default ArkLevelInfo;
