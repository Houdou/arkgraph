import React from 'preact';
import { useState, useEffect, useMemo } from 'preact/hooks';
import style from './style';
import cn from 'classnames';

import ArkRow from '../../components/row';
import ArkItem from '../../components/item';

import ArkCompoundRow from './components/CompoundRow';
import ArkRequirementRow from './components/RequirementRow';
import ArkMaterialInput from './components/MaterialInput';

import { ATTRIBUTES } from '../../models/Attributes';
import { OPERATORS } from '../../models/Operators';
import { MONEY, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../models/Resources';
import aggregateMaterialRequirement from '../../models/aggregateMaterialRequirement';
import useFilterSetting from '../../models/useFilterSetting';

const materials = [
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
	...EXP_TAPES,
	MONEY,
];

const operator_profession_material_filter_option = {
	group: '干员职业',
	field: 'profession',
	options: [
		{ value: 'PIONEER', render: '先锋' },
		{ value: 'WARRIOR', render: '近卫' },
		{ value: 'TANK', render: '重装' },
		{ value: 'SNIPER', render: '狙击' },
		{ value: 'CASTER', render: '术师' },
		{ value: 'MEDIC', render: '医疗' },
		{ value: 'SUPPORT', render: '辅助' },
		{ value: 'SPECIAL', render: '特种' },
	],
};

const operator_rarity_material_filter_option = {
	group: '干员稀有度',
	field: 'rarity',
	options: [
		{ value: 2 },
		{ value: 3 },
		{ value: 4 },
		{ value: 5 },
	],
	render: (value, index) => Array(value + 1).fill().map(e => (
		<span class={style.filter_rarity_star}>★</span>
	)),
};

const upgrade_attribute_material_filter_option = {
	group: '需求种类',
	field: 'attribute',
	options: [
		{ value: 'ELITE_RANK', render: '精英化' },
		{ value: 'SKILL_LEVEL', render: '技能升级' },
		{ value: 'MASTER_SKILL', render: '技能专精' },
	],
};

const attributeMapping = {
	[ATTRIBUTES.SKILL_LEVEL]: 'SKILL_LEVEL',
	[ATTRIBUTES.ELITE_RANK]: 'ELITE_RANK',
	[ATTRIBUTES.MASTER_SKILL_1]: 'MASTER_SKILL',
	[ATTRIBUTES.MASTER_SKILL_2]: 'MASTER_SKILL',
	[ATTRIBUTES.MASTER_SKILL_3]: 'MASTER_SKILL',
};

const ArkMaterials = ({
	config,
	data,
	material_name: material_query_param,
}) => {
	const {
		state: { stock },
		load,
		addRow,
	} = data;

	const [ material_query, setMaterialQuery ] = useState(null);

	useEffect(() => {
		load();

	}, []);

	useEffect(() => {
		const found_material = materials.find(({ id, name }) => name === material_query_param || id === material_query_param);
		if (found_material) {
			setMaterialQuery(found_material.id);
		}
	}, [material_query_param]);

	const operator_profession_material_filter_setting = useFilterSetting(operator_profession_material_filter_option);
	const operator_rarity_material_filter_setting = useFilterSetting(operator_rarity_material_filter_option);
	const upgrade_attribute_material_filter_setting = useFilterSetting(upgrade_attribute_material_filter_option);

	const operator_profession_material_filter = operator_profession_material_filter_setting.getFilter();
	const operator_rarity_material_filter = operator_rarity_material_filter_setting.getFilter();
	const upgrade_attribute_material_filter =upgrade_attribute_material_filter_setting.getFilter();

	const requirement_filter = ({
		profession,
		rarity,
		attribute,
	}) => operator_rarity_material_filter.flags[rarity]
		&& operator_profession_material_filter.flags[profession]
		&& upgrade_attribute_material_filter.flags[attributeMapping[attribute]];

	const material_requirements = useMemo(() => aggregateMaterialRequirement(), [OPERATORS]);

	const material = materials.find(({ id }) => id === material_query);

	const operator_requirements = material_query && material_requirements[material_query].operator || [];
	const filtered_operator_requirements = operator_requirements.filter(requirement_filter);

	const operator_sum = operator_requirements.reduce((prev, next) => prev += next.quantity, 0);

	const compound_requirements = material_query && material_requirements[material_query].compound || [];
	const compound_sum = compound_requirements.map(compound =>
		(material_requirements[compound.result].operator || [])
			.reduce((prev, next) => prev += Number(next.quantity), 0)
			* (Number(compound.required) || 1)
	);

	const global_props = {
		config,
		stock,
	};

	return (
		<div class={style.wrapper}>
			<div class={style.page}>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>材料</span>
					</div>
					<ArkMaterialInput
						material={material && material.name}
						setMaterialQuery={setMaterialQuery}
					/>
				</div>
				{material && operator_sum !== 0 && (
					<div class={style.section}>
						<div class={style.section_header}>
							<span>合计</span>
						</div>
						<div class={style.summary}>
							<div class={style.summary_cell}>
								<ArkItem
									id={material_query}
									tier={material.tier || 'T0'}
									scale={0.8}
									quantity={stock[material.id] || 0}
								/>
								<span class={style.summary_quantity}>{operator_sum}{
									compound_sum && compound_sum.length !== 0 && ` + 合成消耗${compound_sum.reduce((a, b) => (a + b), 0)}`
								}</span>
							</div>
						</div>
					</div>
				)}
				{
					material_query && material && Object.entries(material.formula).length > 0 && (
						<div class={style.section}>
							<div class={style.section_header}>
								<span>合成公式</span>
							</div>
							<div class={style.formula}>
								{
									Object.entries(material.formula).map(([resource, quantity], index) => (
										<div class={style.formula_cell}>
											<ArkItem
												id={resource}
												tier={`T${resource.substr(2, 1)}`}
												scale={0.3}
											/>
											<span>x</span>
											<span
												class={cn(
													style.formula_quantity,
													{
														[style.long_quantity]: resource !== 'G-4-1' && quantity.toString().length > 2,
													}
												)}
											>{quantity}</span>
										</div>
									))
								}
							</div>
						</div>
					)
				}
				<div class={style.section}>
					<div class={style.section_header}>
						<span>合成需求</span>
					</div>
					<div class={style.upgrades}>
						<ArkRow
							cells={
								[
									{ content: '合成项目' },
									{ content: '需求数量' },
									{ content: '公式', fullwidth: true },
								]
							}
							sticky
							disable_hover
						/>
						{
							material_query && compound_requirements.map((compound, index) => (
								compound && (
									<ArkCompoundRow
										material_query={material_query}
										compound={compound}
										formula={materials.find(({ id }) => id === compound.result).formula}
										sum={compound_sum[index] / compound_requirements[index].required}
										{...global_props}
									/>
								)
							))
						}
					</div>
				</div>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>需求一览</span>
					</div>
					<div class={style.filters}>
						<div class={style.actions}>
							<span class={style.filter_title}>{operator_profession_material_filter_option.group}</span>
							<div class={cn(
								style.filter_toggles,
								style.filter_multi_lines
							)}
							>
								{
									operator_profession_material_filter_option.options.map((profession, option_index) => (
										<div
											class={cn(
												style.filter_toggle,
												{
													[style.filter_toggle_active]: operator_profession_material_filter_setting.setting[option_index],
												},
												style.filter_profession
											)}
											onClick={e => {
												e.stopImmediatePropagation();
												operator_profession_material_filter_setting.toggle(option_index);
											}}
										>{profession.render}</div>
									))
								}
							</div>
						</div>
						<div class={style.actions}>
							<span class={style.filter_title}>{operator_rarity_material_filter_option.group}</span>
							<div class={cn(
								style.filter_toggles,
								style.filter_multi_lines
							)}
							>
								{
									operator_rarity_material_filter_option.options.map((rarity, option_index) => (
										<div
											class={cn(
												style.filter_toggle,
												{
													[style.filter_toggle_active]: operator_rarity_material_filter_setting.setting[option_index],
												},
												style.filter_rarity,
											)}
											onClick={e => {
												e.stopImmediatePropagation();
												operator_rarity_material_filter_setting.toggle(option_index);
											}}
										>
											{
												Array(rarity.value + 1).fill().map(e => (
													<span class={style.filter_rarity_star}>★</span>
												))
											}
										</div>
									))
								}
							</div>
						</div>
						<div class={style.actions}>
							<span class={style.filter_title}>{upgrade_attribute_material_filter_option.group}</span>
							<div class={cn(
								style.filter_toggles,
								style.filter_multi_lines
							)}
							>
								{
									upgrade_attribute_material_filter_option.options.map((attribute, option_index) => (
										<div
											class={cn(
												style.filter_toggle,
												{
													[style.filter_toggle_active]: upgrade_attribute_material_filter_setting.setting[option_index],
												},
												style.filter_attribute
											)}
											onClick={e => {
												e.stopImmediatePropagation();
												upgrade_attribute_material_filter_setting.toggle(option_index);
											}}
										>{attribute.render}</div>
									))
								}
							</div>
						</div>
					</div>
					<div class={style.upgrades}>
						<ArkRow
							cells={
								[
									{ content: '干员' },
									{ content: '升级项目' },
									{ content: '现等级' },
									{ content: '目标等级' },
									{ content: '所需材料', fullwidth: true },
								]
							}
							sticky
							disable_hover
						/>
						{
							material_query && filtered_operator_requirements.map((upgrade, index) => (
								upgrade && (
									<ArkRequirementRow
										key={`${upgrade.operator}_${upgrade.attribute}_${upgrade.current}_${upgrade.target}_${index}`}
										material_query={material_query}
										upgrade={upgrade}
										upgrade_index={index}
										addRow={addRow}
										{...global_props}
									/>
								)
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArkMaterials;
