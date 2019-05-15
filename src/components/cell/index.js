import React from 'preact';
import style from './style';
import cn from 'classnames';

const ArkCell = (props) => {
	return (
		<div
			class={
				cn(
					style.cell,
					style[props.header_level],
					{
						[style.header]: props.header
					}
				)
			}
		>
			{
				props.content
			}
		</div>
)};

export default ArkCell;
