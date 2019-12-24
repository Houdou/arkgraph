import React from 'preact';
import style from './style';
import cn from 'classnames';

import useFilterSetting from '../../../../models/useFilterSetting';

const resource_filter_options = [
	{
		group: '材料等级',
		field: 'tier',
		options: [
			{ value: 'T1', render: '1级材料' },
			{ value: 'T2', render: '2级材料' },
			{ value: 'T3', render: '3级材料' },
			{ value: 'T4', render: '4级材料' },
			{ value: 'T5', render: '5级材料' },
		],
	},
	{
		group: '材料种类',
		field: 'type',
		options: [
			{ value: 'money', render: '货币' },
			{ value: 'exp', render: '经验值' },
			{ value: 'tape', render: '作战记录' },
			{ value: 'rare', render: '高级' },
			{ value: 'alcohol', render: '醇' },
			{ value: 'manganese', render: '锰' },
			{ value: 'grind', render: '研磨石' },
			{ value: 'rma', render: 'RMA' },
			{ value: 'stone', render: '源岩' },
			{ value: 'device', render: '装置' },
			{ value: 'ester', render: '酯' },
			{ value: 'sugar', render: '糖' },
			{ value: 'iron', render: '异铁' },
			{ value: 'ketone', render: '酮' },
			{ value: 'gel', render: '凝胶' },
			{ value: 'alloy', render: '合金' },
			{ value: 'skill', render: '技巧概要' },
			{ value: 'chip', render: '芯片' },
		],
	},
];

const ArkFilterSettings = ({
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
										{option.group}
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
													<span>{render}</span>
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
