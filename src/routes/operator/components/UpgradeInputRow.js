import React from 'preact';

import ArkInputCell from '../../../components/inputCell';
import ArkRow from '../../../components/row';

const ArkUpgradeInputRow = ({
	prefix,
	attributes,
}) => {
	const AttributeInput = ({ attribute, setAttribute }) => (props) => (
		<ArkInputCell {...props}
			value={attribute} onChange={value => setAttribute(value)}
		/>
	);

	return (
		<ArkRow
			cells={
				[
					{ content: prefix },
					...attributes.map(field => {
						if (typeof field.override === 'string') {
							return ({ content: field.override });
						}
						return AttributeInput(field);
					}),
				]
			}
			disable_hover
		/>
	);
};

export default ArkUpgradeInputRow;
