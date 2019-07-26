import React from 'preact';
import style from './style';
import cn from 'classnames';

import { RESOURCES } from '../../models/Resources';
const resources_available = Object.keys(RESOURCES);

const parseQuantity = (quantity) => {
	if (quantity > 10000) {
		return `${Math.round(quantity/10000)}万`;
	}
	return quantity;
};

const ArkItem = (props) => {
	const material_id = resources_available.includes(props.id) ? props.id : '404';
	const card_tier = /^T[123456]$/.test(props.tier) ? props.tier : 'T1';
	const shortage = (props.requirement) ? Math.max(props.requirement - (props.quantity || 0), 0) : null;
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
			style={props.style}
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
					<div class={style.numbers}>
						{
							props.quantity && props.quantity !== 0 && (
								<div class={style.quantity}>
									{parseQuantity(props.quantity)}
								</div>
							) || null
						}
						{
							shortage && shortage !== 0 && (
								<div class={style.requirement}>
									{parseQuantity(shortage)}
								</div>
							) || null
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArkItem;
