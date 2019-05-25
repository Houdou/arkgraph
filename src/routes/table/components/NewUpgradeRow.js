import React from 'preact';

import ArkCell from '../../../components/cell';
import ArkButton from '../../../components/button';
import ArkRow from '../../../components/row';

const ArkNewUpgradeRow = ({
	record,
	resources_filter,
	addEmptyRow,
}) => {
	const new_upgrade_button = (props) => (
		<ArkCell
			halfwidth
		>
			<ArkButton value="+" onClick={e => {
				addEmptyRow();
			}}
			/>
		</ArkCell>
	);

	return (
		<ArkRow
			cells={
				[
					new_upgrade_button,
					{ content: '' },
					{ content: '' },
					{ content: '' },
					{ content: '' },
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkNewUpgradeRow;
