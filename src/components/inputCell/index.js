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
		<input type="number" value={props.content} />
	</div>
);

export default ArkInputCell;
