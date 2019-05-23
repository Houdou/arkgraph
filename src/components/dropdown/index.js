import React from 'preact';
import style from './style';
import cn from 'classnames';

const ArkDropdownCell = (props) => (
	<div
		class={
			cn(
				style.cell,
				style.select,
				style[props.header_level],
				{
					[style.header]: props.header,
				}
			)
		}
	>
		<select name={props.name} onChange={e => props.onChange && props.onChange(e.target.value)}>
			{
				props.options.map(option => (
					<option
						value={option.value}
						selected={option.key === props.value}
					>
						{option.value}
					</option>
				))
			}
		</select>
	</div>
);

export default ArkDropdownCell;
