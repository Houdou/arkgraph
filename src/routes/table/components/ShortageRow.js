import React from 'preact';

import ArkRow from '../../../components/row';

const ArkShortageRow = ({
	ir,
	shortage,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const shortage_row = Array.from(header_list)
		.splice(header_skip, header_list.length - header_skip)
		.map(e => ({
			content: shortage[e.id] || '',
			long_text: ir('table-shortage-compound-prefix', 'Compound').length > 6,
			mobile_long_text: shortage[e.id] > 99999 || `${shortage[e.id]}`.startsWith(ir('table-shortage-compound-prefix', 'Compound')),
		}));

	return (
		<ArkRow
			cells={
				[
					{ content: '', halfwidth: true },
					{ content: '', halfwidth: true },
					{ content: '', halfwidth: true },
					{ content: '', force_no_shrink: true },
					{ content: '', force_no_shrink: true },
					{ content: '' },
					{ content: ir('table-row-shortage', 'Shortage') },
					...shortage_row,
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkShortageRow;
