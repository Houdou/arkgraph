import React from 'preact';
import style from './style';
import cn from 'classnames';

const ArkCell = (props) => (
	<div
		class={
			cn(
				style.cell,
				{
					[style[props.header_level]]: props.header_level,
					[style.header]: props.header,
					[style.icons_header]: props.icons_header,
					[style.fullheight]: props.fullheight,
					[style.fullwidth]: props.fullwidth,
					[style.halfwidth]: props.halfwidth,
					[style.is_focus_material]: props.is_focus_material,
					[style.long_text]: props.long_text,
				}
			)
		}
		style={props.style}
		onClick={e => props.onClick && props.onClick(e)}
	>
		{ props.children || (
			<p>{props.content}</p>
		)}
	</div>
);

export default ArkCell;
