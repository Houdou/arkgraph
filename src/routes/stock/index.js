import React from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style';
import cn from 'classnames';

import ArkMaterialsGroup from '../../components/materialsGroup';

import { material_grouping_options, material_list } from './options';

const item_scale = 0.42;

const ArkStockView = ({
	ir,
	config,
	data,
	level_id: level_query,
}) => {
	const {
		state: { stock },
		load,
		adjustStockItem,
	} = data;

	const [grouping_type, setGroupingType_raw] = useState(global.grouping_type || 'default');

	const setGroupingType = (type) => {
		if (type && typeof type === 'string') {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'stock_grouping_type',
					eventAction: 'set',
					eventLabel: type,
				});
			} catch (err) {}
		}
		setGroupingType_raw(type);
		global.grouping_type = type;
	};

	useEffect(() => {
		load();
	}, []);

	return (
		<div class={style.wrapper}>
			<div class={style.page}>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>{ir('stock-stock-stock', 'Stock')}</span>
					</div>
					<div class={style.stock_options}>
						<span class={cn(
							style.material_group_name,
							style.stock_options_header
						)}
						>{ir('stock-stock-display', 'Display')}</span>
						<div class={style.material_grouping_options}>
							{
								Object.entries(material_grouping_options)
									.map(([grouping_option_type, grouping_option]) => (
										<div
											class={cn(
												style.material_grouping_option,
												{
													[style.material_grouping_option_active]: grouping_type === grouping_option_type,
												}
											)}
											onClick={e => {
												setGroupingType(grouping_option_type);
											}}
										>
											<span>{ir(grouping_option.render)}</span>
										</div>
									))
							}
						</div>
					</div>
					<div class={style.stock}>
						<ArkMaterialsGroup
							ir={ir}
							stock={stock}
							resources={material_list}
							item_scale={item_scale}
							adjustStockItem={adjustStockItem}
							groups={material_grouping_options[grouping_type].groups}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArkStockView;
