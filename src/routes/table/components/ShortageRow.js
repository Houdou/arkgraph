import React from 'preact';

import ArkRow from '../../../components/row';

const ArkShortageRow = ({
	data,
	shortage,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const shortage_row = Array.from(header_list)
		.splice(header_skip, header_list.length - header_skip)
		.map(e => ({
			content: shortage[e.id] || '',
		}));

	return (
		<ArkRow
			cells={
				[
					{ content: '', halfwidth: true },
					{ content: '' },
					{ content: '' },
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
