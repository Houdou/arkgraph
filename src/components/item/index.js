import React from 'preact';
import style from './style';
import cn from 'classnames';
import { Link } from 'preact-router/match';

import { RESOURCES, parseQuantity } from '../../models/Resources';
const resources_available = Object.keys(RESOURCES);

const ArkItem = (props) => {
	const material_id = resources_available.includes(props.id) ? props.id : '404';
	const card_tier = /^T[123456]$/.test(props.tier) ? props.tier : 'T1';
	const shortage = (props.requirement) ? Math.max(props.requirement - (props.quantity || 0), 0) : null;
	const exceeded = props.show_exceeded ? Math.max((props.quantity || 0) - (props.requirement || 0), 0) : null;
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
						{
							exceeded && exceeded !== 0 && (
								<div class={style.exceeded}>
									{parseQuantity(exceeded)}
								</div>
							) || null
						}
					</div>
					{(props.force_link || !props.disable_link) && (
						<div
							class={cn(
								style.link,
								{
									[style.force_link]: props.force_link,
								}
							)}
						>
							{
								<Link href={`/materials/${material_id}`} >
									<img src="../assets/icons/external.png" alt="external" style={{ margin: '0 0 0 4px', width: '32px', height: '32px' }} />
								</Link>
							}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ArkItem;
