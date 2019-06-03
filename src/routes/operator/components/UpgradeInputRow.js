import React from 'preact';

import ArkInputCell from '../../../components/inputCell';
import ArkRow from '../../../components/row';

const ArkUpgradeInputRow = ({
	prefix,
	attributes,
	tab_index_offset,
}) => {
	const AttributeInput = ({ attribute, setAttribute }, index) => (props) => (
		<ArkInputCell {...props}
			tabIndex={index + 1 + tab_index_offset}
			value={attribute}
			onChange={value => setAttribute(value)}
		/>
	);

	return (
		<ArkRow
			cells={
				[
					{ content: prefix },
					...attributes.map((field, index) => {
						if (typeof field.override === 'string') {
							return ({ content: field.override });
						}
						return AttributeInput(field, index);
					}),
				]
			}
			disable_hover
		/>
	);
};

export default ArkUpgradeInputRow;
