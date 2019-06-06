import React from 'preact';
import { useState, useEffect, useMemo } from 'preact/hooks';
import style from './style';
import cn from 'classnames';

import ArkRow from '../../components/row';
import ArkItem from '../../components/item';

import ArkCompoundRow from './components/CompoundRow';
import ArkRequirementRow from './components/RequirementRow';
import ArkMaterialInput from './components/MaterialInput';

import { OPERATORS } from '../../models/Operators';
import { MONEY, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../models/Resources';
import aggregateMaterialRequirement from '../../models/aggregateMaterialRequirement';

const materials = [
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
	...EXP_TAPES,
	MONEY,
];

const professions = [
	'先锋',
	'近卫',
	'重装',
	'狙击',
	'术师',
	'医疗',
	'辅助',
	'特种',
];

const ArkMaterials = ({
	config,
	data,
}) => {
	const {
		state: { stock },
		load,
		addRow,
	} = data;

	useEffect(() => {
		load();
	}, []);

	const [ material_query, setMaterialQuery ] = useState(null);

	const init_button_text = '添加全部到计算器';
	const [button_text, setAddAllText_raw] = useState(init_button_text);
	const setButtonText = (text) => {
		setAddAllText_raw(text);
		setTimeout(() => {
			setAddAllText_raw(init_button_text);
		}, 1500);
	};

	const material_requirements = useMemo(() => aggregateMaterialRequirement(), [OPERATORS]);

	const material = materials.find(({ id }) => id === material_query);

	const operator_requirements = material_query && material_requirements[material_query].operator || [];
	const operator_sum = operator_requirements.reduce((prev, next) => prev += next.quantity, 0);

	const compound_requirements = material_query && material_requirements[material_query].compound || [];
	const compound_sum = compound_requirements.map(compound =>
		(material_requirements[compound.result].operator || [])
			.reduce((prev, next) => prev += Number(next.quantity), 0)
			* (Number(compound.required) || 1)
	);
	const sum = operator_sum + compound_sum.reduce((a, b) => (a + b), 0);

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
								/>
								<span class={style.summary_quantity}>{operator_sum}{
									compound_sum && compound_sum.length !== 0 && ` + 合成消耗${compound_sum.reduce((a, b) => (a + b), 0)}`
								}</span>
							</div>
						</div>
					</div>
				)}
				<div class={style.section}>
					<div class={style.section_header}>
						<span>合成需求</span>
					</div>
					<div class={style.upgrades}>
						<ArkRow
							cells={
								[
									{ content: '合成项目' },
									{ content: '公式', fullwidth: true },
									{ content: '需求数量' },
								]
							}
							disable_hover
						/>
						{
							material_query && compound_requirements.map((compound, index) => (
								compound && (
									<ArkCompoundRow
										material_query={material_query}
										compound={compound}
										formula={materials.find(({ id }) => id === compound.result).formula}
										sum={compound_sum[index]}
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
							<span class={style.filter_title}>干员职业</span>
							<div class={cn(
								style.filter_toggles,
								style.filter_multi_lines
							)}
							>
								{
									professions.map(profession => (
										<div
											class={cn(
												style.filter_profession,
												style.filter_toggle
											)}
											onClick={e => e}
										>{profession}</div>
									))
								}
							</div>
						</div>
						<div class={style.actions}>
							<span class={style.filter_title}>干员稀有度</span>
							{
								[3, 4, 5, 6].map(rarity => (
									<div
										class={cn(
											style.filter_toggle,
											style.filter_rarity,
										)}
										onClick={e => e}
									>
										{
											Array(rarity).fill().map(e => (
												<span class={style.filter_rarity_star}>★</span>
											))
										}
									</div>
								))
							}
						</div>
						<div class={style.actions}>
							<span class={style.filter_title}>需求种类</span>
							<div
								class={style.filter_toggle}
								onClick={e => e}
							>精英化</div>
							<div
								class={style.filter_toggle}
								onClick={e => e}
							>技能升级</div>
							<div
								class={style.filter_toggle}
								onClick={e => e}
							>技能专精</div>
						</div>
					</div>
					<div class={style.upgrades}>
						<ArkRow
							cells={
								[
									{ content: '添加' },
									{ content: '干员' },
									{ content: '升级项目' },
									{ content: '现等级' },
									{ content: '目标等级' },
									{ content: '所需材料', fullwidth: true },
								]
							}
							disable_hover
						/>
						{
							material_query && operator_requirements.map((upgrade, index) => (
								upgrade && (
									<ArkRequirementRow
										key={`${upgrade.operator}_${upgrade.attribute}_${upgrade.current}_${upgrade.target}_${index}`}
										material_query={material_query}
										upgrade={upgrade}
										upgrade_index={index}
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
