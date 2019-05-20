import { h } from 'preact';

import ArkRow from '../../components/row';

import { MATERIALS } from '../../model/Materials';

const ArkTableHeader = (props) => (
	<ArkRow
		style={
			{ position: 'sticky', top: 0 }
		}
		cells={
			[
				{ content: 'Name' },
				...MATERIALS.map(m => ({
					content: m.name,
					header_level: m.tier,
				})),
			]
		}
		header
	/>
);

export default ArkTableHeader;
