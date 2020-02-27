import React from 'preact';
import { useState, useEffect, useMemo } from 'preact/hooks';
import style from './style';
import cn from 'classnames';
import { Link } from 'preact-router/match';

import ArkRow from '../../components/row';
import ArkItem from '../../components/item';
import PenguinLink from '../../components/penguinLink';

import ArkDropRow from './components/DropRow';
import ArkCompoundRow from './components/CompoundRow';
import ArkCompoundSideProductsRow from './components/CompoundSideProductsRow';
import ArkCompoundRequirementsRow from './components/CompoundRequirementsRow';
import ArkRequirementRow from './components/RequirementRow';
import ArkMaterialInput from './components/MaterialInput';

import { LEVELS } from '../../models/Levels';
import { ATTRIBUTES } from '../../models/Attributes';
import { OPERATORS } from '../../models/Operators';
import { COMPOUNDS } from '../../models/Compounds';
import { MONEY, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS, getResourceName } from '../../models/Resources';
import sumRequirements from '../../models/sumRequirements';
import aggregateMaterialRequirement from '../../models/aggregateMaterialRequirement';
import useFilterSetting from '../../models/useFilterSetting';
import processRecord from '../../models/processRecord';

const materials = [
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
	...EXP_TAPES,
	MONEY,
];

const operator_profession_material_filter_option = {
	group: 'materials-filter-profession',
	field: 'profession',
	options: [
		{ value: 'PIONEER', render: 'profession-pioneer' },
		{ value: 'WARRIOR', render: 'profession-warrior' },
		{ value: 'TANK', render: 'profession-tank' },
		{ value: 'SNIPER', render: 'profession-sniper' },
		{ value: 'CASTER', render: 'profession-caster' },
		{ value: 'MEDIC', render: 'profession-medic' },
		{ value: 'SUPPORT', render: 'profession-support' },
		{ value: 'SPECIAL', render: 'profession-special' },
	],
};

const operator_rarity_material_filter_option = {
	group: 'materials-filter-rarity',
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
	group: 'materials-filter-type',
	field: 'attribute',
	options: [
		{ value: 'ELITE_RANK', render: 'materials-filter-type-elite' },
		{ value: 'SKILL_LEVEL', render: 'materials-filter-type-skill' },
		{ value: 'MASTER_SKILL', render: 'materials-filter-type-master_skill' },
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
	ir,
	config,
	data,
	drops,
	material_name: material_query_param,
}) => {
	const {
		state: { stock, records, compound_materials },
		load,
		addRow,
		adjustStockItem,
		compoundMaterial,
	} = data;

	const [ material_query, setMaterialQuery_raw ] = useState(null);

	const setMaterialQuery = (name) => {
		if (name && typeof name === 'string') {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'material',
					eventAction: 'query',
					eventLabel: name,
				});
			} catch (err) {}
		}
		try {
			if (window.location.pathname !== `/materials/${name}`) {
				window.history.pushState(null, window.document.title, `/materials/${name}`);
			}
		} catch (err) {}
		setMaterialQuery_raw(name);
	};

	useEffect(() => {
		load();

	}, []);

	useEffect(() => {
		const found_material = materials.find(({ id, unique_id, name }) =>
			name === material_query_param
				|| id === material_query_param
				|| String(unique_id) === material_query_param
		);
		if (found_material) {
			setMaterialQuery(found_material.id);
		}
	}, [material_query_param]);

	const summary = useMemo(() => sumRequirements(records, stock, compound_materials), [records, stock, compound_materials]);

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

	const material_requirements = useMemo(() => aggregateMaterialRequirement({ locale: config.locale, showExtendedData: config.showExtendedData }), [OPERATORS, config.locale]);

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

	const compound_data = material && COMPOUNDS.find(({ material_id }) => material_id === material.id);

	const item_drops = material && drops.filter(({ itemId }) => itemId === String(material.unique_id));
	const source_levels = material && Object.entries(material.source).map(([k, v]) => LEVELS.find(({ level }) => k === level));
	const level_drops = item_drops && source_levels
		&& item_drops
			.map(drop => {
				const level = source_levels.find(({ unique_id }) => drop.stageId === unique_id);
				if (level) {
					return {
						...drop,
						energy: level.energy,
						level: level.level,
					};
				}
				return null;
			})
			.filter(Boolean);


	const sum = {};
	filtered_operator_requirements && filtered_operator_requirements
		.map(processRecord)
		.forEach((upgrade) => {
			upgrade.requirements.forEach(({ resource, quantity }) => {
				sum[resource] = (sum[resource] || 0) + quantity;
			});
		});
	const material_summary = Object.entries(sum)
		.map(([resource, quantity]) => ({
			resource,
			quantity,
			material_index: materials.findIndex(m => m.id === resource),
		}))
		.sort((a, b) => a.material_index > b.material_index ? 1 : -1);

	const global_props = {
		config,
		stock,
		summary,
	};

	return (
		<div class={style.wrapper}>
			<div class={style.page}>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>{ir('materials-material-material', 'Material')}</span>
					</div>
					<ArkMaterialInput
						locale={config.locale}
						material={material && getResourceName({ id: material.id, locale: config.locale, showExtendedData: config.showExtendedData })}
						setMaterialQuery={setMaterialQuery}
					/>
				</div>
				{material && operator_sum !== 0 && (
					<div class={style.section}>
						<div class={style.section_header}>
							<span>{ir('materials-material-summary', 'Summary')}</span>
						</div>
						<div class={style.summary}>
							<div class={style.summary_cell}>
								<ArkItem
									id={material_query}
									tier={material.tier || 'T0'}
									scale={0.8}
									quantity={stock[material.id] || 0}
									disable_link
								/>
								<span class={style.summary_quantity}>{operator_sum}{
									compound_sum && compound_sum.length !== 0 && ` + ${ir('materials-material-compound_requirements', 'Consumption ')}${compound_sum.reduce((a, b) => (a + b), 0)}`
								}</span>
							</div>
						</div>
					</div>
				)}
				{
					material_query && material && level_drops && level_drops.length > 0 && (
						<div class={style.section}>
							<div class={style.section_header}>
								<span>{ir('materials-drop-drop', 'Drop')}</span>
							</div>
							<div class={style.drops}>
								<div class={style.penguin_link}>
									<PenguinLink category="item" id={material.unique_id} render={ir('penguin-check_full_drop_rate', 'Check full drop rate')} />
								</div>
								<ArkRow
									cells={
										[
											{ content: ir('materials-drop-stage', 'Stage') },
											{ content: ir('materials-drop-ap', 'AP') },
											{ content: ir('materials-drop-probability', 'Probability') },
											{ content: ir('materials-drop-expectation', 'AP estimation'), fullwidth: true },
										]
									}
									sticky
									disable_hover
								/>
								{
									material_query && level_drops.map((drop, index) => (
										<ArkDropRow {...drop} />
									))
								}
							</div>
						</div>
					)
				}
				{
					material_query && material && Object.entries(material.formula).length > 0 && (
						<div class={style.section}>
							<div class={style.section_header}>
								<span>{ir('materials-compound-compound', 'Compound')}</span>
							</div>
							<div class={style.compound_area}>
								<ArkRow
									cells={
										[
											{ content: ir('materials-compound-stock', 'Stock') },
											{ content: ir('materials-compound-formula', 'Formula'), fullwidth: true },
										]
									}
									sticky
									disable_hover
								/>
								<ArkCompoundRow
									material_query={material_query}
									material_id={material.id}
									formula={material.formula}
									adjustStockItem={adjustStockItem}
									{...global_props}
								/>
								<div
									class={style.compound_button}
									onClick={e => {
										e.stopImmediatePropagation();
										compoundMaterial(material.id);
									}}
								>{ir('materials-compound-compound_one', 'Compound one')}</div>
							</div>
							{compound_data && (
								<div class={style.compound_side_products}>
									<ArkRow
										cells={
											[
												{ content: ir('materials-compound-side_products', 'Side Products'), fullwidth: true },
											]
										}
										sticky
										disable_hover
									/>
									<ArkCompoundSideProductsRow
										compound_data={compound_data}
										adjustStockItem={adjustStockItem}
										{...global_props}
									/>
								</div>
							)}
						</div>
					)
				}
				<div class={style.section}>
					<div class={style.section_header}>
						<span>{ir('materials-compound-required', 'Compound')}</span>
					</div>
					<div class={style.upgrades}>
						<ArkRow
							cells={
								[
									{ content: ir('materials-compound-outcome', 'Outcome') },
									{ content: ir('materials-compound-required_quantity', 'Need') },
									{ content: ir('materials-compound-formula', 'Formula'), fullwidth: true },
								]
							}
							sticky
							disable_hover
						/>
						{
							material_query && compound_requirements.map((compound, index) => (
								compound && (
									<ArkCompoundRequirementsRow
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
						<span>{ir('materials-requirements-requirements', 'Requirements')}</span>
					</div>
					<div class={style.filters}>
						<div class={style.actions}>
							<span class={style.filter_title}>{ir(operator_profession_material_filter_option.group, 'Profession')}</span>
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
										>{ir(profession.render)}</div>
									))
								}
							</div>
						</div>
						<div class={style.actions}>
							<span class={style.filter_title}>{ir(operator_rarity_material_filter_option.group, 'Rarity')}</span>
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
							<span class={style.filter_title}>{ir(upgrade_attribute_material_filter_option.group, 'Type')}</span>
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
										>{ir(attribute.render)}</div>
									))
								}
							</div>
						</div>
					</div>
					<div class={style.upgrades}>
						<ArkRow
							cells={
								[
									{ content: ir('materials-requirements-operator', 'Operator') },
									{ content: ir('materials-requirements-attribute', 'Attribute') },
									{ content: ir('materials-requirements-from_level', 'From') },
									{ content: ir('materials-requirements-to_level', 'To') },
									{ content: ir('materials-requirements-required_materials', 'Required materials'), fullwidth: true },
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
										ir={ir}
										showExtendedData={config.showExtendedData}
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
				{material_summary && material_summary.length > 0 && (
					<div class={style.section}>
						<div class={style.section_header}>
							<span>{ir('materials-requirements-summary', 'Summary')}</span>
						</div>
						<div class={style.requirements_summary}>
							{
								material_summary.map(({ resource, quantity }) => (
									<div class={style.requirement_cell}>
										<Link href={`/materials/${resource}`}>
											<ArkItem
												id={resource}
												tier={`T${resource.substr(2, 1)}`}
												scale={0.25}
												disable_link
											/>
										</Link>
										<span>x</span>
										<span
											class={cn(
												style.requirement_quantity,
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
				)}
			</div>
		</div>
	);
};

export default ArkMaterials;
