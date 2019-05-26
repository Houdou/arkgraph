import React from 'preact';
import cn from 'classnames';
import style from './style';
import ArkCell from '../cell';
import ArkInputCell from '../inputCell';

const ArkRow = (props) => {
	const cell_props = {
		header: props.header,
		icons_header: props.icons_header,
	};

	return (
		<div
			class={cn(
				style.row,
				{
					[style.header]: props.header,
					[style.icons_header]: props.icons_header,
				}
			)}
		>
			{
				props.cells
					.filter(e => e !== undefined)
					.map(cell => {
						if (cell instanceof Function) {
							const Component = cell;
							return (<Component {...cell_props} />);
						}
						return cell.input ? (
							<ArkInputCell {...cell} {...cell_props} />
						) : (
							<ArkCell {...cell} {...cell_props} />
						);
					}).filter((e, i) => props.resources_filter ? props.resources_filter(i) : true)
			}
		</div>
	);
};

export default ArkRow;
