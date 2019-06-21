import React from 'preact';

import ArkRow from '../../../components/row';

const ArkSummaryRow = ({
	summary,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const summary_row = Array.from(header_list)
		.splice(header_skip, header_list.length - header_skip)
		.map(e => ({
			content: summary[e.id] || '',
			mobile_long_text: summary[e.id] > 99999,
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
					{ content: '合计' },
					...summary_row,
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkSummaryRow;
