import React from 'preact';
import style from './style';
import cn from 'classnames';

import { RESOURCES } from '../../../../models/Resources';
import getShortageFocusMaterials from '../../../../models/getShortageFocusMaterials';
import ArkMaterialCard from '../../../../components/materialCard';

const ArkFocusMaterials = ({
	ir,
	config,
	focus_materials,
	toggleFocusMaterial,
	addFocusMaterials,
	setFocusMaterials,
	clearFocusMaterials,
	compound_materials,
	toggleCompoundMaterial,
	compoundMaterial,
	stock,
	adjustStockItem,
	summary,
	shortage,
	drops,
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
			<h2>{ir('focus_materials-track_materials', 'Focusing materials')}</h2>
			{
				config.showFocusMaterials && material_groups.length !== 0 && (
					<div
						class={style.clear}
						onClick={e => clearFocusMaterials(e)}
					/>
				)
			}
			{
				config.showFocusMaterials && material_groups.length === 0 && (
					<div
						class={style.auto}
						onClick={e => setFocusMaterials(getShortageFocusMaterials(shortage))}
					>
						<span>{ir('focus_materials-smart_track', 'Auto')}</span>
					</div>
				)
			}
			<div class={style.scroll}>
				<div class={style.materials}>
					{
						material_groups.map(({ id: material_id, options }, index) => (
							<ArkMaterialCard
								key={material_id}
								ir={ir}
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
								drops={drops}
								{...options}
							/>
						))
					}
					{
						material_groups.length === 0 && (
							<div class={style.hint}><h3>{ir('focus_materials-placeholder_hint', 'Click table header or [+] button to focus on certain materials')}</h3></div>
						)
					}
				</div>
			</div>
		</div>
	);
};

export default ArkFocusMaterials;
