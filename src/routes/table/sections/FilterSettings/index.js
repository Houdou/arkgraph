import React from 'preact';
import style from './style';
import cn from 'classnames';

import ArkCell from '../../../../components/cell';
import ArkButton from '../../../../components/button';

const resource_types = [
	{ type: 'stone', render: '源岩' },
	{ type: 'device', render: '装置' },
	{ type: 'ester', render: '酯' },
	{ type: 'suger', render: '糖' },
	{ type: 'iron', render: '异铁' },
	{ type: 'ketone', render: '酮' },
	{ type: 'alcohol', render: '醇' },
	{ type: 'manganese', render: '锰' },
	{ type: 'grind', render: '研磨石' },
	{ type: 'rma', render: 'RMA' },
	{ type: 'chip', render: '芯片' },
	{ type: 'other', render: '其他' },
];

const resource_tiers = [
	{ tier: 'T1', render: '1级材料' },
	{ tier: 'T2', render: '2级材料' },
	{ tier: 'T3', render: '3级材料' },
	{ tier: 'T4', render: '4级材料' },
	{ tier: 'T5', render: '5级材料' },
];

const ArkFilterSettings = ({
	record,
	resources_filter,
	addEmptyRow,
	addLastRow,
}) => {
	const new_upgrade_input = (props) => (
		<ArkCell force_no_shrink>
			<ArkButton
				value="+"
				onClick={e => {
					addEmptyRow();
				}}
			/>
		</ArkCell>
	);

	return (
		<div class={style.fullscreen_cover}>
			<div class={style.wrapper}>
				<div class={style.settings}>
					<div class={style.setting}>
						<div
							class={cn(
								style.setting_header,
								style.grey
							)}
						>
							材料等级
						</div>
						<div class={style.setting_options}>
							{
								resource_tiers.map(({ tier, render }) => (
									<div
										class={cn(
											style.setting_option,
											{
												[style.setting_option_active]: Math.random() > 0.5,
											},
											style.setting_option_tier,
											style[`setting_option_tier_${tier}`],
											style.black
										)}
									>
										<span>{render}</span>
									</div>
								))
							}
						</div>
					</div>
					<hr />
					<div class={style.setting}>
						<div
							class={cn(
								style.setting_header,
								style.grey
							)}
						>
							材料类别
						</div>
						<div class={style.setting_options}>
							{
								resource_types.map(({ type, render }) => (
									<div
										class={cn(
											style.setting_option,
											{
												[style.setting_option_active]: Math.random() > 0.5,
											},
											style.black
										)}
									>
										<span>{render}</span>
									</div>
								))
							}
						</div>
					</div>
					<hr />
					<div class={style.setting_buttons}>
						<div
							class={cn(
								style.setting_button,
								style.setting_button_close,
							)}
						>
							<img src="../../../../assets/icons/close_white.png" alt="" class={style.button_icon} />
						</div>
						<div
							class={cn(
								style.setting_button,
								style.setting_button_confirm,
							)}
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
