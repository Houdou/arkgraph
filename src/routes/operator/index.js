import React from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style';
import cn from 'classnames';
import { Link } from 'preact-router/match';

import ArkRow from '../../components/row';
import ArkItem from '../../components/item';

import ArkUpgradeInputRow from './components/UpgradeInputRow';
import ArkUpgradeRow from './components/UpgradeRow';
import ArkOperatorTableHeader from './components/TableHeader';
import ArkOperatorInput from './components/OperatorInput';

import { ATTRIBUTES } from '../../models/Attributes';
import { OPERATORS } from '../../models/Operators';
import { MONEY, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../models/Resources';
import exp from '../../models/exp';
import useOperatorUpgrade from './hooks/useOperatorUpgrade';

const material_order = [
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
	...EXP_TAPES,
	MONEY,
];

const ArkOperatorTable = ({
	config,
	data,
	operator_name: operator_name_query,
}) => {
	const {
		state: { stock },
		load,
		addRow,
	} = data;

	const {
		operatorUpgrade,
		setOperatorUpgrade,
		setOperator: setOperator_raw,
		setCurrentElite,
		setTargetElite,
		setCurrentLevel,
		setTargetLevel,
		setCurrentAllSkill,
		setTargetAllSkill,
		setCurrentMasterSkill_1,
		setTargetMasterSkill_1,
		setCurrentMasterSkill_2,
		setTargetMasterSkill_2,
		setCurrentMasterSkill_3,
		setTargetMasterSkill_3,
	} = useOperatorUpgrade(global.operator_upgrade);

	const setOperator = (name) => {
		if (name && typeof name === 'string') {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'operator',
					eventAction: 'query',
					eventLabel: name,
				});
			} catch (err) {}
		}
		try {
			if (window.location.pathname !== `/operator/${name}`) {
				window.history.pushState(null, window.document.title, `/operator/${name}`);
			}
		} catch (err) {}
		setOperator_raw(name);
	};

	const {
		operator: operator_name,
		current_elite,
		target_elite,
		current_level,
		target_level,
		current_all_skill,
		target_all_skill,
		current_master_skill_1,
		target_master_skill_1,
		current_master_skill_2,
		target_master_skill_2,
		current_master_skill_3,
		target_master_skill_3,
		upgrades,
	} = operatorUpgrade;

	const init_add_all_text = '添加全部到计算器';
	const [add_all_text, setAddAllText_raw] = useState(init_add_all_text);
	const setAddAllText = (text) => {
		setAddAllText_raw(text);
		setTimeout(() => {
			setAddAllText_raw(init_add_all_text);
		}, 1500);
	};

	useEffect(() => {
		load();
	}, []);

	useEffect(() => {
		const operator = OPERATORS.find(o => o.name === operator_name_query);
		if (operator) {
			setOperator(operator.name);
		}
	}, [operator_name_query]);

	const operator = OPERATORS.find(o => o.name === operator_name);
	const skill_render_map = {};
	if (operator) {
		operator.skill_names.forEach((skill_name, index) => {
			skill_render_map[ATTRIBUTES[`MASTER_SKILL_${index+1}`]] = skill_name || null;
		});
	}

	const unavailable_attributes = [];
	if (operator) {
		if (operator.meta.max_master_skills < 3) {
			unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_3);
		}
		if (operator.meta.max_master_skills < 2) {
			unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_2);
		}
		if (operator.meta.max_master_skills === 1) {
			if (operator.master_skills[0].upgrades.every(({ materials }) => materials.length === 0)){
				unavailable_attributes.push(ATTRIBUTES.MASTER_SKILL_1);
			}
		}
	}

	const setMaxAttribute = (elite_rank, is_target = true) => {
		const attr = is_target ? 'target' : 'current';
		if (operator) {
			setOperatorUpgrade({
				...operatorUpgrade,
				operator: operator_name,
				current_elite: is_target ? Math.min(elite_rank, current_elite) : elite_rank,
				target_elite: is_target ? elite_rank : Math.max(elite_rank, target_elite),
				[`${attr}_level`]: exp.maxLevel[operator.rarity][elite_rank],
				[`${attr}_all_skill`]: elite_rank === 0 ? 4 : 7,
				[`${attr}_master_skill_1`]:
					elite_rank === 2 && !unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_1)
						? 3 : 0,
				[`${attr}_master_skill_2`]:
					elite_rank === 2 && !unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_2)
						? 3 : 0,
				[`${attr}_master_skill_3`]:
					elite_rank === 2 && !unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_3)
						? 3 : 0,
			});
		}
	};

	const setMinAttribute = (elite_rank, is_target = true) => {
		const attr = is_target ? 'target' : 'current';
		if (operator) {
			setOperatorUpgrade({
				...operatorUpgrade,
				operator: operator_name,
				current_elite: is_target ? Math.min(elite_rank, current_elite) : current_elite,
				target_elite: is_target ? elite_rank : Math.max(elite_rank, target_elite),
				[`${attr}_level`]: 1,
				[`${attr}_all_skill`]: 1,
				[`${attr}_master_skill_1`]: 0,
				[`${attr}_master_skill_2`]: 0,
				[`${attr}_master_skill_3`]: 0,
			});
		}
	};

	const resetAttributes = () => {
		setOperatorUpgrade({
			...operatorUpgrade,
			operator: null,
			current_elite: 0,
			target_elite: 0,
			current_level: 1,
			target_level: 1,
			current_all_skill: 1,
			target_all_skill: 1,
			current_master_skill_1: 0,
			target_master_skill_1: 0,
			current_master_skill_2: 0,
			target_master_skill_2: 0,
			current_master_skill_3: 0,
			target_master_skill_3: 0,
			upgrades: [],
		});
	};


	const fulfilled_upgrades = (upgrades || []).map(upgrade =>
		Boolean(upgrade.requirements) &&
		upgrade.requirements.length > 0 &&
		upgrade.requirements
			.every(({ resource, quantity }) => stock[resource] && stock[resource] >= quantity)
	);

	const sum = {};
	upgrades.forEach((upgrade) => {
		upgrade.requirements.forEach(({ resource, quantity }) => {
			sum[resource] = (sum[resource] || 0) + quantity;
		});
	});
	const summary = Object.entries(sum)
		.map(([resource, quantity]) => ({
			resource,
			quantity,
			material_index: material_order.findIndex(m => m.id === resource),
		}))
		.sort((a, b) => a.material_index > b.material_index ? 1 : -1);

	const global_props = {
		config,
		stock,
	};

	return (
		<div class={style.wrapper}>
			<div class={style.page}>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>干员</span>
					</div>
					<ArkOperatorInput
						operator={operator_name}
						setOperator={setOperator}
					/>
				</div>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>培养计划</span>
					</div>
					<div class={style.table}>
						<ArkOperatorTableHeader
							operator={operator}
							{...global_props}
						/>
						<ArkUpgradeInputRow
							prefix="目前等级"
							attributes={[
								{ attribute: current_elite, setAttribute: setCurrentElite },
								{ attribute: current_level, setAttribute: setCurrentLevel },
								{ attribute: current_all_skill, setAttribute: setCurrentAllSkill },
								{
									attribute: current_master_skill_1,
									setAttribute: setCurrentMasterSkill_1,
									override: unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_1) ? '' : null,
								},
								!unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_2)
									&& { attribute: current_master_skill_2, setAttribute: setCurrentMasterSkill_2 },
								!unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_3)
									&& { attribute: current_master_skill_3, setAttribute: setCurrentMasterSkill_3 },
							].filter(Boolean)
							}
							tab_index_offset={0}
						/>
						<ArkUpgradeInputRow
							prefix="培养目标"
							attributes={[
								{ attribute: target_elite, setAttribute: setTargetElite },
								{ attribute: target_level, setAttribute: setTargetLevel },
								{ attribute: target_all_skill, setAttribute: setTargetAllSkill },
								{
									attribute: target_master_skill_1,
									setAttribute: setTargetMasterSkill_1,
									override: unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_1) ? '无法升级' : null,
								},
								!unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_2)
									&& { attribute: target_master_skill_2, setAttribute: setTargetMasterSkill_2 },
								!unavailable_attributes.includes(ATTRIBUTES.MASTER_SKILL_3)
									&& { attribute: target_master_skill_3, setAttribute: setTargetMasterSkill_3 },
							].filter(Boolean)
							}
							tab_index_offset={6}
						/>
						<div class={style.actions}>
							<span>快捷选项</span>
							<div
								class={style.max_attribute}
								onClick={e => setMaxAttribute(0, true)}
								onContextMenu={e => {
									e.preventDefault();
									setMaxAttribute(0, false);
								}}
							>无精英满级满技能</div>
							<div
								class={style.max_attribute}
								onClick={e => setMaxAttribute(1, true)}
								onContextMenu={e => {
									e.preventDefault();
									setMaxAttribute(1, false);
								}}
							>精英1满级满技能</div>
							{operator && operator.rarity >= 3 && (
								<div
									class={style.max_attribute}
									onClick={e => setMaxAttribute(2, true)}
									onContextMenu={e => {
										e.preventDefault();
										setMaxAttribute(2, false);
									}}
								>精英2满级满技能</div>
							)}
						</div>
						<div class={style.actions}>
							<span  />
							<div
								class={style.max_attribute}
								onClick={e => setMinAttribute(1, true)}
								onContextMenu={e => {
									e.preventDefault();
									setMinAttribute(1, false);
								}}
							>精英1</div>
							{operator && operator.rarity >= 3 && (
								<div
									class={style.max_attribute}
									onClick={e => setMinAttribute(2, true)}
									onContextMenu={e => {
										e.preventDefault();
										setMinAttribute(2, false);
									}}
								>精英2</div>
							)}
						</div>
					</div>
				</div>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>需求材料</span>
					</div>
					<div class={style.upgrades}>
						<ArkRow
							cells={
								[
									{ content: '可完成' },
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
							upgrades && upgrades.map((upgrade, index) => (
								upgrade.requirements.length > 0 && (
									<ArkUpgradeRow
										key={`${upgrade.operator}_${upgrade.attribute}_${upgrade.current}_${upgrade.target}_${index}`}
										upgrade={upgrade}
										skill_render_map={skill_render_map}
										upgrade_index={index}
										fulfilled={fulfilled_upgrades[index]}
										{...global_props}
									/>
								)
							))
						}
					</div>
				</div>
				<div
					class={cn(
						style.section,
						style.section_no_header
					)}
				>
					<div
						class={style.save}
						onClick={e => {
							upgrades.forEach(addRow);
							setTimeout(() => {
								resetAttributes();
							}, 300);
							setAddAllText('已添加');
						}}
					>{add_all_text}</div>
				</div>
				{summary && summary.length > 0 && (
					<div class={style.section}>
						<div class={style.section_header}>
							<span>合计</span>
						</div>
						<div class={style.summary}>
							{
								summary.map(({ resource, quantity }) => (
									<div class={style.requirement_cell}>
										<Link href={`/materials/${resource}`}>
											<ArkItem
												id={resource}
												tier={`T${resource.substr(2, 1)}`}
												scale={0.25}
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

export default ArkOperatorTable;
