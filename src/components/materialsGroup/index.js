import React from 'preact';
import style from './style';

import ArkItem from '../item';

const ArkMaterialGroup = ({
	ir,
	stock = {},
	summary = {},
	groups,
	resources,
	adjustStockItem,
	item_scale,
	filter,
	filter_type,
}) => {
	if (Object.keys(groups).length === 0) {
		groups.default = {
			render: 'material_group-stock_order',
			list: Array(resources.length).fill().map((_, index) => index),
		};
	}
	return (
		<div class={style.material_groups}>
			{
				resources && Object.entries(groups).map(([group_key, { render, list }]) => (
					<div class={style.material_group}>
						<span class={style.material_group_name}>{ir(render)}</span>
						<div class={style.material_group_materials}>
							{
								list.map((index) => (
									Boolean(filter ? filter(resources[index]) : true) && (
										<div
											key={resources[index].id}
											class={style.material_group_item}
											onClick={e => {
												e.preventDefault();
												e.stopPropagation();
												adjustStockItem(resources[index].id, e.shiftKey ? 10 : 1);
											}}
											onContextMenu={e => {
												e.preventDefault();
												e.stopPropagation();
												adjustStockItem(resources[index].id, e.shiftKey ? -10 : -1);
											}}
										>
											<ArkItem
												id={resources[index].id}
												tier={resources[index].tier}
												scale={item_scale}
												quantity={stock[resources[index].id] || 0}
												requirement={summary[resources[index].id] || 0}
												show_exceeded={filter_type === 'exceeded'}
											/>
										</div>
									)))
							}
						</div>
					</div>
				))
			}
		</div>
	);
};

export default ArkMaterialGroup;
