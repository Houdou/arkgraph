import React from 'preact';
import style from './style';
import cn from 'classnames';

import { RESOURCES } from '../../../../models/Resources';
import ArkMaterialCard from '../../../../components/materialCard';

const ArkFocusMaterials = ({
	config,
	focus_materials,
	toggleFocusMaterial,
	addFocusMaterials,
	clearFocusMaterials,
	compound_materials,
	toggleCompoundMaterial,
	compoundMaterial,
	stock,
	adjustStockItem,
	summary,
	shortage,
}) => {
	const material_groups = focus_materials
		.filter(({ id: material_id, options }) => RESOURCES[material_id] && options && !options.hidden);

	return (
		<div class={cn(
			style.wrapper,
			{
				[style.hide_focus_materials]: !config.showFocusMaterials }
		)}
		>
			<h2>追踪材料</h2>
			<div
				class={cn(style.clear, {
					[style.show_clear]: material_groups.length !== 0 && config.showFocusMaterials,
				})}
				onClick={e => clearFocusMaterials(e)}
			/>
			<div class={style.scroll}>
				<div class={style.materials}>
					{
						material_groups.map(({ id: material_id, options }, index) => (
							<ArkMaterialCard
								key={material_id}
								id={material_id}
								card_index={index}
								class={style.card}
								stock={stock}
								adjustStockItem={adjustStockItem}
								summary={summary}
								shortage={shortage}
								toggleFocusMaterial={toggleFocusMaterial}
								addFocusMaterials={addFocusMaterials}
								compound_materials={compound_materials}
								compounded={compound_materials.some(({ id }) => id === material_id)}
								toggleCompoundMaterial={toggleCompoundMaterial}
								compoundMaterial={compoundMaterial}
								{...options}
							/>
						))
					}
					{
						material_groups.length === 0 && (
							<div class={style.hint}><h3>点击表头材料图标添加追踪</h3></div>
						)
					}
				</div>
			</div>
		</div>
	);
};

export default ArkFocusMaterials;
