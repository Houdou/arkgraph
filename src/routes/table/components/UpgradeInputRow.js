import React from 'preact';

import ArkRow from '../../../components/row';

import ArkFuseInputCell from '../../../components/fuseInputCell';
import ArkDropdownCell from '../../../components/dropdown';

import { ATTRIBUTES } from '../../../models/Attributes';

const ArkUpgradeInputRow = ({
	record,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const OperatorInput = (props) => (<ArkFuseInputCell {...props} />);
	const AttributeInput = (props) => (
		<ArkDropdownCell {...props}
			options={Object.entries(ATTRIBUTES).map(([k, v]) => ({ key: k, value: v }))}
		/>
	);

	return (
		<ArkRow
			cells={
				[
					OperatorInput,
					AttributeInput,
					{ content: 0 , input: true },
					{ content: 0 , input: true },
					...Array.from(header_list)
						.splice(header_skip, header_list.length - header_skip)
						.map(e => ({
							content: '',
						})),
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkUpgradeInputRow;
