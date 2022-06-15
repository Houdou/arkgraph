import React from 'preact';
import cn from 'classnames';

import style from '../../style';
import panel_style from './style';

import ArkRow from '../../../../components/row';

const ArkSortingPanel = ({
	ir,
	config,
	records,
	addLastRow,
	addEmptyRow,
	updateRow,
	removeRow,
	completeRow,
	fulfillment_statuses,
	summary,
	toggleHiddenAll,
	sortRecords,
	header_list,
	header_skip,
	resources_filter,
}) => {


	return (
		<div
			class={cn(
				style.row_header,
				panel_style.wrapper
			)}
		>
			<div class={panel_style.buttons}>
				<div class={panel_style.button}>
					{ir('table-sorting_panel-sort', 'Sorting')}
				</div>
				<div class={cn(panel_style.button, panel_style.enable, panel_style.image_button )}>
				<img src="../../../../assets/icons/move_to_first.png" alt="move-first" style={{
					height: '22px',
				}}/>
				</div>
				<div class={cn(panel_style.button, panel_style.enable, panel_style.image_button )}>
				<img src="../../../../assets/icons/move_up.png" alt="move-up" style={{
					height: '22px',
				}}/>
				</div>
				<div class={cn(panel_style.button, panel_style.enable, panel_style.image_button )}>
				<img src="../../../../assets/icons/move_down.png" alt="move-down" style={{
					height: '22px',
				}}/>
				</div>
				<div class={cn(panel_style.button, panel_style.enable, panel_style.image_button )}>
				<img src="../../../../assets/icons/move_to_last.png" alt="move-last" style={{
					height: '22px',
				}}/>
				</div>
			</div>
		</div>
	);
};

export default ArkSortingPanel;