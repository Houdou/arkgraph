import { h } from 'preact';

import ArkRow from '../../components/row';

const ArkTableRow = (props) => (
	<ArkRow
		cells={
			[
				{ content: 'Name' },
			]
		}
		header
	/>
);

export default ArkTableRow;
