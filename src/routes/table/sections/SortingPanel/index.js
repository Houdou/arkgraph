import React from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import cn from 'classnames';

import style from '../../style';
import panel_style from './style';

let debounce = -1;

const ArkSortingPanel = ({
	ir,
	config,
	records,
	moveRows,
	clearSelection,
}) => {
	const headerRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (debounce) {
				clearTimeout(debounce);
			}

			debounce = setTimeout(() => {
				if (headerRef && headerRef.current) {
					headerRef.current.style.transform = `translate(${window.scrollX}px, ${window.scrollY}px)`;
				}
			}, 100);
		};
		window.addEventListener('scroll', handleScroll);
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const selected_count = records.filter(record => record.selected).length;

	return (
		<div
			class={cn(
				style.row_header,
				panel_style.wrapper
			)}
			style={{
				opacity: selected_count > 0 ? 1 : 0
			}}
			ref={headerRef}
		>
			<div class={panel_style.buttons}>
				<div class={cn(
					panel_style.button,
				)}
				>
					{selected_count}{' '}{ir('table-sorting_panel-selected_count', 'selected')}
				</div>
				<div class={cn(panel_style.button, panel_style.image_button )}
					onClick={() => { moveRows('to_first'); }}
				>
				<img src="../../../../assets/icons/move_to_first.png" alt="move-first" style={{
					height: '22px',
				}}/>
				</div>
				<div class={cn(panel_style.button, panel_style.image_button )}
					onClick={() => { moveRows('up'); }}
				>
				<img src="../../../../assets/icons/move_up.png" alt="move-up" style={{
					height: '22px',
				}}/>
				</div>
				<div class={cn(panel_style.button, panel_style.image_button )}
					onClick={() => { moveRows('down'); }}
				>
				<img src="../../../../assets/icons/move_down.png" alt="move-down" style={{
					height: '22px',
				}}/>
				</div>
				<div class={cn(panel_style.button, panel_style.image_button )}
					onClick={() => { moveRows('to_last'); }}
				>
				<img src="../../../../assets/icons/move_to_last.png" alt="move-last" style={{
					height: '22px',
				}}/>
				</div>
				<div class={cn(panel_style.button, panel_style.image_button )}
					onClick={() => { clearSelection(); }}
				>
				<img src="../../../../assets/icons/clear_selection.png" alt="move-last" style={{
					height: '22px',
				}}/>
				</div>
			</div>
		</div>
	);
};

export default ArkSortingPanel;