import React from 'preact';
import style from './style';
import ArkCell from '../cell';

const ArkRow = (props) => {
	const cell_props = {
		header: props.header,
	};

	return (
		<div
			class={style.row}
			style={props.style}
		>
			{
				props.cells.map(cell => (
					<ArkCell {...cell} {...cell_props} />
				))
			}
		</div>
	);
};

export default ArkRow;
