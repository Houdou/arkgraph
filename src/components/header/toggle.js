import React from 'preact';
import style from './style';
import cn from 'classnames';

const Toggle = (props) => (
	<div
		class={
			cn(
				style.toggle,
				{
					[style.enable]: Boolean(props.value),
				}
			)
		}
		onClick={
			e => {
				props.toggle(!props.value);
			}
		}
	>
		{
			props.content
		}
	</div>
);

export default Toggle;
