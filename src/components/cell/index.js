import React from 'preact';
import style from './style';
import cn from 'classnames';

const ArkCell = (props) => (
	<div
		class={
			cn(
				style.cell,
				style[props.header_level],
				{
					[style.header]: props.header,
					[style.empty]: !props.content,
				}
			)
		}
	>
		{
			props.content
		}
	</div>
);

export default ArkCell;
