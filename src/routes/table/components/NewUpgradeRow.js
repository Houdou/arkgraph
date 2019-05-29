import React from 'preact';

import ArkCell from '../../../components/cell';
import ArkButton from '../../../components/button';
import ArkRow from '../../../components/row';

const ArkNewUpgradeRow = ({
	record,
	resources_filter,
	addEmptyRow,
}) => {
	const new_upgrade_input = (props) => (
		<ArkCell>
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
					{ content: '', halfwidth: true },
					{ content: '', halfwidth: true },
					new_upgrade_input,
					{ content: '' },
					{ content: '' },
					{ content: '' },
				]
			}
			disable_hover
			resources_filter={resources_filter}
		/>
	);
};

export default ArkNewUpgradeRow;
