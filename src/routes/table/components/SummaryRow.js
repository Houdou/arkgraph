import { h } from 'preact';

import ArkRow from '../../../components/row';

const ArkSummaryRow = (
	{
		record,
		summary,
		header_list,
		header_skip,
		resources_filter,
	}
) => {
	const summary_row = Array.from(header_list)
		.splice(header_skip, header_list.length - header_skip)
		.map(e => (
			{
				content: summary[e.id] || '',
			}
		));

	return (
		<ArkRow
			cells={
				[
					{ content: '' },
					{ content: '' },
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
