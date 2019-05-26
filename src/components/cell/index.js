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
					[style.icons_header]: props.icons_header,
					[style.fullwidth]: props.fullwidth,
					[style.halfwidth]: props.halfwidth,
				}
			)
		}
		style={props.style}
	>
		{ props.children || (
			<p>{props.content}</p>
		)}
	</div>
);

export default ArkCell;
