import React from 'preact';
import style from './style';
import cn from 'classnames';

const ArkInputCell = (props) => {
	const handleNext = (e) => {
		const nextTabIndex = Math.max(props.tabIndex + (e.shiftKey ? -1 : 1), 0);
		setTimeout(() => {
			const next = document.getElementById(`input_${nextTabIndex}`);
			if (next && next.focus && next.select) {
				next.focus();
				next.select();
			}
		});
	};

	return (
		<div
			class={
				cn(
					style.cell,
					style[props.header_level],
					{
						[style.header]: props.header,
					}
				)
			}
		>
			<input
				type="number"
				value={props.content || props.value}
				id={`input_${props.tabIndex}`}
				autocomplete="user-password"
				onChange={
					e => {
						const value = Math.max(Number(e.target.value), 0);
						props.onChange && props.onChange(value);
					}
				}
				onKeyDown={
					e => {
						if (e.key === 'Tab') {
							handleNext(e);
						}
					}
				}
				onClick={e => {
					e.target.select();
				}}
			/>
		</div>
	);
};

export default ArkInputCell;
