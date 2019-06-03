import React from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import ArkCell from '../../../components/cell';
import ArkButton from '../../../components/button';
import ArkRow from '../../../components/row';

import ArkFuseInputCell from '../../../components/fuseInputCell';
import ArkDropdownCell from '../../../components/dropdown';
import ArkInputCell from '../../../components/inputCell';

import { ATTRIBUTES } from '../../../models/Attributes';
import { OPERATORS } from '../../../models/Operators';

import useRecord from '../../../models/useRecord';

const ArkUpgradeInputRow = ({
	record: init_record,
	record_index,
	update,
	remove,
	complete,
	fulfilled,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const {
		record: {
			operator,
			attribute,
			current,
			target,
			requirements,
		},
		setOperator,
		setAttribute,
		setCurrent,
		setTarget,
	} = useRecord(init_record);

	const operatorInputRef = useRef(null);

	useEffect(() => {
		if (!operator) {
			operatorInputRef.current && operatorInputRef.current.focus();
		}
	}, []);

	const options = Object.entries(ATTRIBUTES).map(([k, v]) => ({ key: k, value: v }));
	const operator_data = OPERATORS.find(o => o.name === operator);
	const unavailable_attributes = [];
	const render_map = {};

	if (operator_data) {
		if (operator_data.meta.max_elite_rank < 2) {
			unavailable_attributes.push(ATTRIBUTES.LEVEL_ELITE_2);
		}

		if (operator_data.meta.max_master_skills < 3) {
			unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_3);
		}
		if (operator_data.meta.max_master_skills < 2) {
			unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_2);
		}
		if (operator_data.meta.max_master_skills === 1) {
			if (operator_data.master_skills[0].upgrades.every(({ materials }) => materials.length === 0)){
				unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_1);
			}
		}

		[
			ATTRIBUTES.MASTER_SKILL_1,
			ATTRIBUTES.MASTER_SKILL_2,
			ATTRIBUTES.MASTER_SKILL_3,
		].filter(attr => !unavailable_attributes.includes(attr))
			.forEach((attr, index) => {
				if (operator_data.skill_names[index]) {
					render_map[attr] = operator_data.skill_names[index];
				}
			});
	}

	const OperatorInput = (props) => (
		<ArkFuseInputCell {...props}
			inputRef={operatorInputRef}
			value={operator} onChange={value => {
				update(record_index, setOperator(value));
			}}
		/>
	);

	const AttributeInput = (props) => (
		<ArkDropdownCell {...props}
			options={options.filter(option => !unavailable_attributes.includes(option.value))}
			render_map={render_map}
			value={attribute} onChange={value => {
				update(record_index, setAttribute(value));
			}}
		/>
	);

	const CurrentInput = (props) => (
		<ArkInputCell {...props}
			value={current} onChange={value => {
				update(record_index, setCurrent(value));
			}}
		/>
	);

	const TargetInput = (props) => (
		<ArkInputCell {...props}
			value={target} onChange={value => {
				update(record_index, setTarget(value));
			}}
		/>
	);

	const RemoveButton = (props) => (
		<ArkCell halfwidth>
			<ArkButton onClick={() => remove(record_index)}>
				<img src="../../../assets/icons/close.png" alt="close" style={{
					height: '20px',
				}}
				/>
			</ArkButton>
		</ArkCell>
	);

	const CompleteButton = (props) => (
		<ArkCell halfwidth>
			<ArkButton onClick={() => fulfilled && complete(record_index)}>
				<img src="../../../assets/icons/tick.png" alt="tick" style={{
					height: '20px',
					opacity: fulfilled ? 1 : 0.2,
				}}
				/>
			</ArkButton>
		</ArkCell>
	);

	const summary = requirements.reduce((prev, next) => {
		prev[next.resource] = prev[next.resource] || 0;
		prev[next.resource] += next.quantity;
		return prev;
	}, {});

	return (
		<ArkRow
			cells={
				[
					RemoveButton,
					CompleteButton,
					OperatorInput,
					AttributeInput,
					CurrentInput,
					[
						ATTRIBUTES.LEVEL_ELITE_0,
						ATTRIBUTES.LEVEL_ELITE_1,
						ATTRIBUTES.LEVEL_ELITE_2,
					].includes(attribute) ? TargetInput : { content: Number(current + 1) || '' },
					...Array.from(header_list)
						.splice(header_skip, header_list.length - header_skip)
						.map(e => ({
							content: summary[e.id] || '',
						})),
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkUpgradeInputRow;
