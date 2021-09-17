import React from 'preact';
import style from './style';
import cn from 'classnames';

import useFilterSetting from '../../../../models/useFilterSetting';

const resource_filter_options = [
	{
		group: 'material_grouping_options-tier',
		field: 'tier',
		options: [
			{ value: 'T5', render: 'material_grouping_options-tier-T5' },
			{ value: 'T4', render: 'material_grouping_options-tier-T4' },
			{ value: 'T3', render: 'material_grouping_options-tier-T3' },
			{ value: 'T2', render: 'material_grouping_options-tier-T2' },
			{ value: 'T1', render: 'material_grouping_options-tier-T1' },
		],
	},
	{
		group: 'material_grouping_options-type',
		field: 'type',
		options: [
			{ value: 'money', render: 'material_grouping_options-type-money' },
			{ value: 'tape', render: 'material_grouping_options-type-tape' },
			{ value: 'rare', render: 'material_grouping_options-type-rare' },
			{ value: 'alcohol', render: 'material_grouping_options-type-alcohol' },
			{ value: 'manganese', render: 'material_grouping_options-type-manganese' },
			{ value: 'grind', render: 'material_grouping_options-type-grind' },
			{ value: 'rma', render: 'material_grouping_options-type-rma' },
			{ value: 'stone', render: 'material_grouping_options-type-stone' },
			{ value: 'device', render: 'material_grouping_options-type-device' },
			{ value: 'ester', render: 'material_grouping_options-type-ester' },
			{ value: 'sugar', render: 'material_grouping_options-type-sugar' },
			{ value: 'iron', render: 'material_grouping_options-type-iron' },
			{ value: 'ketone', render: 'material_grouping_options-type-ketone' },
			{ value: 'gel', render: 'material_grouping_options-type-gel' },
			{ value: 'alloy', render: 'material_grouping_options-type-alloy' },
			{ value: 'crystal', render: 'material_grouping_options-type-crystal' },
			{ value: 'cuttingfluid', render: 'material_grouping_options-type-cuttingfluid' },
			{ value: 'solvent', render: 'material_grouping_options-type-solvent' },
			{ value: 'skill', render: 'material_grouping_options-type-skill' },
			{ value: 'chip', render: 'material_grouping_options-type-chip' },
		],
	},
];

const ArkFilterSettings = ({
	ir,
	addEmptyRow,
	addLastRow,
	filters,
	toggleShowFilter,
	setFilters,
}) => {
	const resource_types_filters = resource_filter_options
		.map((option, group_index) => useFilterSetting(option, filters[group_index] && filters[group_index].flags));

	return (
		<div
			class={style.fullscreen_cover}
			onClick={e => {
				toggleShowFilter(false);
			}}
		>
			<div
				class={style.wrapper}
				onClick={e => {
					e.stopImmediatePropagation();
				}}
			>
				<div class={style.settings}>
					{
						resource_filter_options.map((option, group_index) => (
							<div>
								<div class={style.setting}>
									<div
										class={cn(
											style.setting_header,
											style.grey
										)}
										onClick={e => {
											resource_types_filters[group_index].enableAll();
										}}
									>
										{ir(option.group)}
									</div>
									<div class={style.setting_options}>
										{
											option.options.map(({ value, render }, option_index) => (
												<div
													class={cn(
														style.setting_option,
														{
															[style.setting_option_active]: resource_types_filters[group_index].setting[option_index],
															[style.setting_option_hidden]: value === 'hidden',
														},
														option.field === 'tier' && {
															[style.setting_option_tier]: true,
															[style[`setting_option_tier_${value}`]]: true,
														},
														option.field === 'type' && {
															[style.setting_option_type]: true,
															[style[`setting_option_type_${value}`]]: true,
														},
														style.black
													)}
													onClick={e => {
														e.stopImmediatePropagation();
														if (value !== 'hidden') {
															resource_types_filters[group_index].toggle(option_index);
														}
													}}
												>
													<span>{ir(render)}</span>
												</div>
											))
										}
									</div>
								</div>
								<hr />
							</div>
						))
					}
					<div class={style.setting_buttons}>
						<div
							class={cn(
								style.setting_button,
								style.setting_button_close,
							)}
							onClick={e => {
								e.stopImmediatePropagation();
								toggleShowFilter(false);
							}}
						>
							<img src="../../../../assets/icons/close_white.png" alt="" class={style.button_icon} />
						</div>
						<div
							class={cn(
								style.setting_button,
								style.setting_button_confirm,
							)}
							onClick={e => {
								setFilters(resource_types_filters.map(option => option.getFilter()));
								e.stopImmediatePropagation();
								toggleShowFilter(false);
							}}
						>
							<img src="../../../../assets/icons/tick_white.png" alt="" class={style.button_icon} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArkFilterSettings;
