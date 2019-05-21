import { h } from 'preact';

import ArkRow from '../../../components/row';

const ArkStockRow = ({
	record,
	header_list,
	header_skip,
	resources_filter,
}) => (
	<ArkRow
		cells={
			[
				{ content: '' },
				{ content: '' },
				{ content: '' },
				{ content: '库存' },
				...Array.from(header_list)
					.splice(header_skip, header_list.length - header_skip)
					.map(e => ({
						input: true,
					})),
			]
		}
		resources_filter={resources_filter}
	/>
);

export default ArkStockRow;
