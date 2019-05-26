import React from 'preact';
import cn from 'classnames';
import style from './style';
import { RESOURCES } from '../../models/Resources';
import ArkItem from '../item';

const parseQuantity = (quantity) => {
	if (quantity > 10000) {
		return `${~~(quantity/10000)}万`;
	}
	return quantity;
};

const ArkMaterialCard = ({
	id, stock,
}) => {
	const material = RESOURCES[id];
	return (
		<div class={style.wrapper}>
			<div class={style.card}>
				<div class={style.item}>
					<ArkItem id={id} tier={material.tier} scale={0.5} />
				</div>
				<div class={cn(style.description, style.line)}>
					<div class={style.section}>
						<span class={style.black}>{material.name}</span>
					</div>
					<div
						class={cn(
							style.section,
							style.stock
						)}
					>
						<span class={style.black}>库存</span>
						<span class={style.grey}>{parseQuantity(stock[id] || 0)}</span>
					</div>
				</div>
				<hr />
				<span class={style.black}>掉落</span>
				<div class={style.source}>
					{
						Object.entries(material.source).map(([k,v]) => (
							<span class={style.source_level}>
								<span>{k}</span>
								<span class={style.black}>{v}</span>
							</span>
						))
					}
				</div>
				<hr />
				<span class={style.black}>合成</span>
				<div class={cn(style.formula, style.line)}>
					{
						Object.entries(material.formula).map(([k,v]) => {
							const ingredient = RESOURCES[k];
							return (
								<div class={style.ingredient}>
									<ArkItem id={k} tier={ingredient.tier} />
									<span>{parseQuantity(stock[k] || 0)}/{v}</span>
								</div>
							);
						})
					}
				</div>
			</div>
		</div>
	);
};

export default ArkMaterialCard;
