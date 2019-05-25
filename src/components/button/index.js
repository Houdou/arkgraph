import React from 'preact';
import style from './style';
import cn from 'classnames';

const ArkCell = (props) => (
	<button
		class={
			cn(
				style.button,
				style[props.header_level],
				{
					[style.header]: props.header,
					[style.empty]: !props.content,
				}
			)
		}
		style={props.style}
		onClick={e => props.onClick && props.onClick(e)}
	>
		{
			props.value || props.children
		}
	</button>
);

export default ArkCell;
