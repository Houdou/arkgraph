import React from 'preact';
import cn from 'classnames';
import style from './style';
import { RESOURCES } from '../../models/Resources';

import ArkItem from '../item';
import ArkLevelInfo from '../levelInfo';

const parseQuantity = (quantity) => {
	if (quantity > 10000) {
		return `${~~(quantity/10000)}万`;
	}
	return quantity;
};

const getIngradients = (material) => Object.keys(material.formula).filter(i => i !== 'G-4-1');

const ArkMaterialCard = ({
	id,
	card_index,
	stock,
	toggleFocusMaterial,
	addFocusMaterials,
}) => {
	const material = RESOURCES[id];
	const ingredients = getIngradients(material);
	return (
		<div class={style.wrapper}>
			<div class={style.card}>
				<div
					class={cn(style.black, style.close)}
					onClick={e => toggleFocusMaterial(id)}
				/>
				<div class={style.item}>
					<ArkItem
						id={id}
						tier={material.tier}
						scale={0.5}
					/>
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
							<ArkLevelInfo
								level={k}
								drop_rarity={v}
								energy={10}
							/>
						))
					}
				</div>
				<hr />
				<div class={cn(style.compound, style.line)}>
					<span class={style.black}>合成</span>
					<span
						class={cn(style.grey, style.add_all)}
						onClick={e => addFocusMaterials(ingredients, card_index)}
					>追踪全部</span>
				</div>
				<div class={cn(style.formula, style.line)}>
					{
						Object.entries(material.formula).map(([k,v]) => {
							const ingredient = RESOURCES[k];
							return (
								<div class={style.ingredient}>
									<ArkItem
										id={k}
										tier={ingredient.tier}
										onClick={() => toggleFocusMaterial(k)}
									/>
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
