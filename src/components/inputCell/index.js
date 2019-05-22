import React from 'preact';
import style from './style';
import cn from 'classnames';

const ArkInputCell = (props) => (
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
			onChange={
				e => {
					const value = Math.max(Number(e.target.value), 0);
					props.onChange && props.onChange(value);
				}
			}
		/>
	</div>
);

export default ArkInputCell;
