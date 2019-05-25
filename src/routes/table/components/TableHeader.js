import React from 'preact';

import ArkRow from '../../../components/row';

const ArkTableHeader = ({
	header_list,
	header_skip,
	resources_filter,
}) => (
	<ArkRow
		cells={
			[
				{ content: '☰', halfwidth: true },
				{ content: '名称' },
				{ content: '升级项目' },
				{ content: '现等级' },
				{ content: '下一等级' },
				...Array.from(header_list)
					.splice(header_skip, header_list.length - header_skip)
					.map(e => ({
						content: e.name,
						header_level: e.tier,
					})),
			]
		}
		resources_filter={resources_filter}
		header
	/>
);

export default ArkTableHeader;
