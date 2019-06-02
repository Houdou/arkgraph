import React from 'preact';

import ArkRow from '../../../components/row';
import ArkInputCell from '../../../components/inputCell';

const ArkUpgradeInputRow = ({
	prefix,
	attributes,
}) => {
	const AttributeInput = ({attribute, setAttribute}) => (props) => (
		<ArkInputCell {...props}
			value={attribute} onChange={value => setAttribute(value)}
		/>
	);

	return (
		<ArkRow
			cells={
				[
					{ content: prefix },
					...attributes.map(AttributeInput),
				]
			}
			disable_hover
		/>
	);
};

export default ArkUpgradeInputRow;
