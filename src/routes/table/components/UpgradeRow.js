import { h } from 'preact';

import ArkRow from '../../../components/row';

const ArkUpgradeRow = (
	{
		record,
		header_list,
		header_skip,
		resources_filter,
	}
) => {
	const summary = record.requirements.reduce((prev, next) => {
		prev[next.resource.id] = prev[next.resource.id] || 0;
		prev[next.resource.id] += next.quantity;
		return prev;
	}, {});

	const record_row = Array.from(header_list)
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
					{ content: record.operator },
					{ content: record.attribute },
					{ content: record.from },
					{ content: record.to },
					...record_row,
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkUpgradeRow;
