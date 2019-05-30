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
					[style.long_text]: (props.render_map[props.value] || '').length > 5,
				}
			)
		}
	>
		<select name={props.name} onInput={e => {
			props.onChange && props.onChange(e.target.value);
		}}
		>
			{
				props.options.map(option => (
					<option
						value={option.value}
						selected={option.value === props.value}
					>
						{props.render_map[option.value] || option.value}
					</option>
				))
			}
		</select>
	</div>
);

export default ArkDropdownCell;
