import React from 'preact';
import { useState } from 'preact/hooks';

import ArkRow from '../../../components/row';

import ArkFuseInputCell from '../../../components/fuseInputCell';
import ArkDropdownCell from '../../../components/dropdown';
import ArkInputCell from '../../../components/inputCell';

import { ATTRIBUTES } from '../../../models/Attributes';

// temp
import { OPERATORS } from '../../../models/Operators';
import { RESOURCES } from '../../../models/RESOURCES';

const useRecordKey = () => {
	const [record_key, setRecordKey_raw] = useState({ operator: null, attribute: null, value: 1 });
	const [requirements, setRequirements] = useState([]);

	const setRecordKey = (to_update) => {
		const {
			operator,
			attribute,
			value: attribute_level,
		} = to_update;
		const matching = OPERATORS.find(o => o.name === operator);
		if (attribute === ATTRIBUTES.SKILL_LEVEL) {
			setRequirements(matching.skills[attribute_level - 1].materials);
		}
		setRecordKey_raw(to_update);
	};

	const setOperator = (operator) => {
		setRecordKey({
			...record_key,
			operator,
		});
	};
	const setAttribute = (attribute) => {
		setRecordKey({
			...record_key,
			attribute,
		});
	};
	const setValue = (value) => {
		setRecordKey({
			...record_key,
			value,
		});
	};

	return {
		record_key,
		setOperator,
		setAttribute,
		setValue,
		requirements,
	};
};

const ArkUpgradeInputRow = ({
	record,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const {
		record_key: {
			operator,
			attribute,
			value: attribute_level,
		},
		setOperator,
		setAttribute,
		setValue,
		requirements,
	} = useRecordKey();

	const OperatorInput = (props) => (
		<ArkFuseInputCell {...props}
			value={operator} onChange={value => setOperator(value)}
		/>
	);
	const AttributeInput = (props) => (
		<ArkDropdownCell {...props}
			options={Object.entries(ATTRIBUTES).map(([k, v]) => ({ key: k, value: v }))}
			value={attribute} onChange={value => setAttribute(value)}
		/>
	);
	const ValueInput = (props) => (
		<ArkInputCell {...props}
			value={attribute_level} onChange={value => setValue(value)}
		/>
	);

	return (
		<ArkRow
			cells={
				[
					OperatorInput,
					AttributeInput,
					ValueInput,
					{ content: attribute_level + 1 },
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
