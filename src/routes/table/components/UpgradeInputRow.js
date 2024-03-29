import React from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import ArkCell from '../../../components/cell';
import ArkButton from '../../../components/button';
import ArkRow from '../../../components/row';

import ArkFuseInputCell from '../../../components/fuseInputCell';
import ArkDropdownCell from '../../../components/dropdown';
import ArkInputCell from '../../../components/inputCell';

import { ATTRIBUTES } from '../../../models/Attributes';
import { OPERATORS, getOperatorName, getSkillNames, getEquipmentNames } from '../../../models/Operators';
import { FULFILLMENT_STATUS } from '../../../models/checkFulFillment';

import useRecord from '../../../models/useRecord';

const BUTTON_STYLE_MAPPING = {
	[FULFILLMENT_STATUS.FULFILLED]: {
		opacity: 1,
		background: 'unset',
	},
	[FULFILLMENT_STATUS.COMPOUND]: {
		opacity: 0.6,
		borderRadius: '50%',
		background: '#00b0d1',
	},
	[FULFILLMENT_STATUS.UNSATISFIED]: {
		opacity: 0.2,
		background: 'unset',
	},
};

const ArkUpgradeInputRow = ({
	ir,
	showExtendedData,
	record: init_record,
	record_index,
	update,
	remove,
	complete,
	fulfillment_status,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const {
		record: {
			operator_id,
			attribute,
			current,
			target,
			hidden,
			selected,
			requirements,
		},
		setOperatorId,
		setAttribute,
		setCurrent,
		setTarget,
		setHidden,
		setSelected,
	} = useRecord(init_record);

	const operatorInputRef = useRef(null);

	useEffect(() => {
		if (!operator_id) {
			operatorInputRef.current && operatorInputRef.current.focus();
		}
	}, []);

	const options = Object.entries(ATTRIBUTES).map(([k, v]) => ({ key: k, value: v }));
	const operator_data = OPERATORS.find(o => o.unique_id === operator_id);
	const unavailable_attributes = [];
	const render_map = {
		LEVEL_ELITE_0: ir('attribute-level_elite_0', 'Lv - Elite 0'),
		LEVEL_ELITE_1: ir('attribute-level_elite_1', 'Lv - Elite 1'),
		LEVEL_ELITE_2: ir('attribute-level_elite_2', 'Lv - Elite 2'),
		ELITE_RANK: ir('attribute-elite_rank', 'Elite Rank'),
		SKILL_LEVEL: ir('attribute-skill_level', 'Skill Level'),
		MASTER_SKILL_1: ir('attribute-master_skill_1', 'Master Skill 1'),
		MASTER_SKILL_2: ir('attribute-master_skill_2', 'Master Skill 2'),
		MASTER_SKILL_3: ir('attribute-master_skill_3', 'Master Skill 3'),
		ADVANCED_EQUIPMENT_1: ir('attribute-advanced_equipment_1', 'Module 1'),
		ADVANCED_EQUIPMENT_2: ir('attribute-advanced_equipment_2', 'Module 2'),
		ADVANCED_EQUIPMENT_3: ir('attribute-advanced_equipment_3', 'Module 3'),
	};

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
		if (operator_data.meta.max_equipments < 3) {
			unavailable_attributes.push(ATTRIBUTES.ADVANCED_EQUIPMENT_3);
			if (operator_data.meta.max_equipments < 2) {
				unavailable_attributes.push(ATTRIBUTES.ADVANCED_EQUIPMENT_2);
				if (operator_data.meta.max_equipments < 1) {
					unavailable_attributes.push(ATTRIBUTES.ADVANCED_EQUIPMENT_1);
				}
			}
		}

		[
			ATTRIBUTES.MASTER_SKILL_1,
			ATTRIBUTES.MASTER_SKILL_2,
			ATTRIBUTES.MASTER_SKILL_3,
		].filter(attr => !unavailable_attributes.includes(attr))
			.forEach((attr, index) => {
				const skill_names = getSkillNames({
					id: operator_id,
					locale: ir.locale,
					showExtendedData,
				});
				if (skill_names[index]) {
					render_map[attr] = skill_names[index];
				}
			});

		if (!unavailable_attributes.includes(ATTRIBUTES.ADVANCED_EQUIPMENT_1)) {
			const equipment_names = getEquipmentNames({
				id: operator_id,
				locale: ir.locale,
				showExtendedData,
			});

			equipment_names.forEach((name, index) => {
				render_map[ATTRIBUTES[`ADVANCED_EQUIPMENT_${index+1}`]] = name;
			});
		}
	}

	const OperatorInput = (props) => (
		<ArkFuseInputCell {...props}
			locale={ir.locale}
			inputRef={operatorInputRef}
			value={getOperatorName({
				id: operator_id,
				locale: ir.locale,
				showExtendedData,
			})}
			onChange={({ unique_id }) => {
				update(record_index, setOperatorId(unique_id));
			}}
		/>
	);

	const AttributeInput = (props) => (
		<ArkDropdownCell {...props}
			options={options.filter(option => !unavailable_attributes.includes(option.value))}
			render_map={render_map}
			value={attribute}
			onChange={value => {
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

	const SelectButton = (props) => (
		<ArkCell halfwidth>
			<ArkButton
				onClick={() => {
					update(record_index, setSelected(!selected));
				}}
			>
				<img src="../../../assets/icons/select.png" alt="tick" style={{
					height: '20px',
					borderRadius: '2px',
					background: selected ? '#00b0d1' : '#cecece',
					opacity: selected ? 0.8 : 0.2
				}}
				/>
			</ArkButton>
		</ArkCell>
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
			<ArkButton onClick={() => fulfillment_status === FULFILLMENT_STATUS.FULFILLED && complete(record_index)}>
				<img src="../../../assets/icons/tick.png" alt="tick" style={{
					height: '20px',
					...BUTTON_STYLE_MAPPING[fulfillment_status],
				}}
				/>
			</ArkButton>
		</ArkCell>
	);

	const VisibilityButton = (props) => (
		<ArkCell halfwidth>
			<ArkButton
				onClick={() => {
					update(record_index, setHidden(!hidden));
				}}
			>
				<img src="../../../assets/icons/hidden.png" alt="tick" style={{
					height: '20px',
					opacity: hidden ? 1 : 0.2,
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
					SelectButton,
					RemoveButton,
					CompleteButton,
					VisibilityButton,
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
							dim: hidden,
							mobile_long_text: summary[e.id] > 99999,
						})),
				]
			}
			selected={selected}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkUpgradeInputRow;
