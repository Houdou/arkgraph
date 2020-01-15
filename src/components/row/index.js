import React from 'preact';
import cn from 'classnames';
import ArkCell from '../cell';
import ArkInputCell from '../inputCell';

const ArkRow = (props) => {
	const cell_props = {
		header: props.header,
		icons_header: props.icons_header,
		fullheight: props.fullheight,
		stretch: props.stretch,
	};

	return (
		<div
			class={cn(
				'row',
				{
					header: props.header,
					icons_header: props.icons_header,
					disable_hover: props.disable_hover,
					sticky: props.sticky,
					long_text: props.long_text,
				}
			)}
			style={props.style}
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
