import React from 'preact';

import ArkCell from '../../../components/cell';
import ArkButton from '../../../components/button';
import ArkRow from '../../../components/row';

const ArkNewUpgradeRow = ({
	addEmptyRow,
	addLastRow,
	resources_filter,
}) => {
	const new_upgrade_input = (props) => (
		<ArkCell force_no_shrink>
			<ArkButton
				value="+"
				onClick={e => {
					addEmptyRow();
				}}
			/>
		</ArkCell>
	);
	const new_copy_input = (props) => (
		<ArkCell force_no_shrink>
			<ArkButton
				value=""
				onDblClick={e => {
					addLastRow();
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
					new_copy_input,
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
