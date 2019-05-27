import React from 'preact';
import style from './style';
import cn from 'classnames';

import { RESOURCES } from '../../models/Resources';
const resources_available = Object.keys(RESOURCES);

const ArkItem = (props) => {
	const material_id = resources_available.includes(props.id) ? props.id : '404';
	const card_tier = /^T[123456]$/.test(props.tier) ? props.tier : 'T1';
	return (
		<div
			class={
				cn(
					style.cell,
					style[props.header_level],
					{
						[style.header]: props.header,
						[style.fullwidth]: props.fullwidth,
						[style.halfwidth]: props.halfwidth,
					}
				)
			}
			onClick={e => props.onClick && props.onClick(e)}
		>
			<div class={style.wrapper}>
				<div
					class={style.composer}
					style={{
						transform: `scale(${props.scale || 0.3})`,
					}}
				>
					<img src={`../../assets/materials/${material_id}.png`} class={style.item} alt="material_id" />
					<img src={`../../assets/cards/${card_tier}.png`} class={style.card} alt="card_tier" />
				</div>
			</div>
		</div>
	);
};

export default ArkItem;
