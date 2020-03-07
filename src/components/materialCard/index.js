import React from 'preact';
import cn from 'classnames';
import style from './style';
import { RESOURCES, getResourceName, parseQuantity } from '../../models/Resources';

import ArkItem from '../item';
import ArkLevelInfo from '../levelInfo';
import PenguinLink from '../penguinLink';

const getIngradients = (material) => Object.keys(material.formula).filter(i => i !== 'G-4-1');

const ArkMaterialCard = ({
	ir,
	id,
	card_index,
	stock,
	adjustStockItem,
	drops,
	summary,
	shortage,
	toggleFocusMaterial,
	addFocusMaterials,
	compound_materials,
	compounded,
	toggleCompoundMaterial,
	compoundMaterial,
}) => {
	const material = RESOURCES[id];
	const ingredients = getIngradients(material);
	const stock_amount = parseQuantity(stock[id] || 0, ir.locale);
	const summary_amount = parseQuantity(summary[id] || 0, ir.locale);
	const shortage_amount = parseQuantity(shortage[id] || 0, ir.locale);
	const can_compound = Object.keys(material.formula).length > 0;

	const item_drops = drops.filter(({ itemId }) => itemId === String(material.unique_id));

	return (
		<div class={style.wrapper}>
			<div class={style.card}>
				<div class={style.top}>
					<div
						class={cn(style.black, style.close)}
						onClick={e => toggleFocusMaterial(id)}
					/>
					<div
						class={style.item}
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();
							adjustStockItem(id, 1);
						}}
						onContextMenu={e => {
							e.preventDefault();
							e.stopPropagation();
							adjustStockItem(id, -1);
						}}
					>
						<ArkItem
							id={id}
							tier={material.tier}
							scale={0.5}
							quantity={stock_amount}
						/>
					</div>
					<div class={cn(style.description, style.line)}>
						<div class={style.section}>
							<span class={style.black}>
								<a href={`/materials/${material.id}`}>{getResourceName({ id: material.id, locale: ir.locale })}</a>
							</span>
						</div>
						{
							summary_amount !== 0 && (
								compounded ? (
									<div class={cn(style.stock)}>
										<span class={style.grey}>{ir('material_card-summary-need_compound', 'To compound')}</span>
										<span class={style.black}>{
											`${shortage_amount}`
												.replace(ir('table-shortage-compound-prefix'), '')
												.replace(ir('table-shortage-compound-suffix'), '')
										}</span>
									</div>
								) : (
									<div class={cn(style.stock)}>
										<span class={style.grey}>{ir('material_card-summary', 'Need')}</span>
										<span class={style.black}>{summary_amount}</span>
									</div>
								)
							)
						}
					</div>
					{
						shortage_amount !== 0 && !compounded && (
							<div class={cn(style.right_line, style.shortage)}>
								<span class={style.grey}>{ir('material_card-shortage', 'Lack')}</span>
								<span class={style.red}>{shortage_amount}</span>
							</div>
						)
					}
				</div>
				<div class={style.body}>
					<div class={style.tag_hr}>
						<span class={cn(style.grey, style.tag)}>{ir('material_card-drop-level', 'Level drop')}</span>
						<span class={style.hr} />
						{
							false && (
								<span class={cn(style.grey, style.tag_right)}>
									<PenguinLink category="item" id={material.unique_id} />
								</span>
							)
						}
					</div>
					<div class={cn(style.source, 'drop_source')}>
						{
							Object.entries(material.source).map(([k,v]) => (
								<ArkLevelInfo
									level={k}
									drop_probability={v}
									drops={item_drops}
								/>
							))
						}
					</div>
					<div
						class={style.tag_hr}
						onClick={e => can_compound && toggleCompoundMaterial(id)}
					>
						<span class={cn(compounded ? style.black : style.grey, style.tag)}>{ir('material_card-compound-compound', 'Compound')}</span>
						<span class={style.hr} />
					</div>
					{
						can_compound && (
							<div class={style.compound}>
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
													<span style={{ 'white-space': 'nowrap' }}>{parseQuantity(stock[k] || 0, ir.locale)}/{v}</span>
												</div>
											);
										})
									}
								</div>
								<div
									class={style.center_line}
									onClick={e => compoundMaterial(id)}
								>
									<span class={style.compound_button}>{ir('material_card-compound-button', 'Compound')}</span>
								</div>
							</div>
						)
					}
				</div>
				<div class={style.footer}>
					{
						can_compound && (
							<div class={style.actions}>
								<div class={style.line}>
									<span
										class={cn(style.inline_button, style.add_all)}
										onClick={e => addFocusMaterials(ingredients, card_index)}
									>{ir('material_card-compound-track_formula', 'Expand formula')}</span>
									<span
										class={cn(
											{
												[style.inline_button_active]: compounded,
											},
											style.inline_button,
											style.use_compound
										)}
										onClick={e => {
											toggleCompoundMaterial(id);
											if (!compounded) {
												addFocusMaterials(ingredients, card_index);
											}
										}}
									>{ir('material_card-compound-use_formula', 'Use compound')}</span>
								</div>
							</div>
						)
					}
				</div>
			</div>
		</div>
	);
};

export default ArkMaterialCard;
