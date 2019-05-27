import React from 'preact';
import style from './style';
import cn from 'classnames';

import { RESOURCES } from '../../../../models/Resources';
import ArkMaterialCard from '../../../../components/materialCard';

const ArkFocusMaterials = ({
	focus_materials,
	toggleFocusMaterial,
	addFocusMaterials,
	clearFocusMaterials,
	stock,
}) => {
	const material_groups = focus_materials
		.filter(({ id: material_id, options }) => RESOURCES[material_id] && options && !options.hidden);

	return (
		<div class={style.wrapper}>
			<h2>追踪材料</h2>
			<div
				class={cn(style.clear, {
					[style.show_clear]: material_groups.length !== 0,
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
								toggleFocusMaterial={toggleFocusMaterial}
								addFocusMaterials={addFocusMaterials}
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
