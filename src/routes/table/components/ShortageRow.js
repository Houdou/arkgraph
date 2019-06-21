import React from 'preact';

import ArkRow from '../../../components/row';

const ArkShortageRow = ({
	shortage,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const shortage_row = Array.from(header_list)
		.splice(header_skip, header_list.length - header_skip)
		.map(e => ({
			content: shortage[e.id] || '',
			mobile_long_text: shortage[e.id] > 99999 || `${shortage[e.id]}`.startsWith('合成'),
		}));

	return (
		<ArkRow
			cells={
				[
					{ content: '', halfwidth: true },
					{ content: '', halfwidth: true },
					{ content: '', force_no_shrink: true },
					{ content: '', force_no_shrink: true },
					{ content: '' },
					{ content: '缺少' },
					...shortage_row,
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkShortageRow;
