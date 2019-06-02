import React from 'preact';
import { useEffect } from 'preact/hooks';
import style from './style';
import cn from 'classnames';

import ArkRow from '../../components/row';

import ArkUpgradeInputRow from './components/UpgradeInputRow';
import ArkUpgradeRow from './components/UpgradeRow';
import ArkOperatorTableHeader from './components/TableHeader';
import ArkOperatorInput from './components/OperatorInput';

import useOperatorUpgrade from './hooks/useOperatorUpgrade';

const header_list = [
	{ name: '移除' },
	{ name: '完成' },
	{ name: '干员' },
	{ name: '升级项目' },
	{ name: '现等级' },
	{ name: '下一等级' },
];

const ArkOperatorTable = ({
	config,
	data,
}) => {
	const {
		state: { stock },
		load,
		addEmptyRow,
	} = data;

	useEffect(() => {
		load();
	}, []);

	const {
		operatorUpgrade: {
			operator,
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
		},
		setOperator,
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
	} = useOperatorUpgrade();

	const fulfilled_upgrades = (upgrades || []).map(upgrade =>
		Boolean(upgrade.requirements) &&
		upgrade.requirements.length > 0 &&
		upgrade.requirements
			.every(({ resource, quantity }) => stock[resource] && stock[resource] >= quantity)
	);

	const global_props = {
		config,
		stock,
		header_list,
	};

	return (
		<div class={style.wrapper}>
			<div class={style.page}>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>干员</span>
					</div>
					<ArkOperatorInput
						operator={operator}
						setOperator={setOperator}
					/>
				</div>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>培养计划</span>
					</div>
					<div class={style.table}>
						<ArkOperatorTableHeader
							{...global_props}
						/>
						<ArkUpgradeInputRow
							prefix="目前等级"
							attributes={[
								{ attribute: current_level, setAttribute: setCurrentLevel },
								{ attribute: current_elite, setAttribute: setCurrentElite },
								{ attribute: current_all_skill, setAttribute: setCurrentAllSkill },
								{ attribute: current_master_skill_1, setAttribute: setCurrentMasterSkill_1 },
								{ attribute: current_master_skill_2, setAttribute: setCurrentMasterSkill_2 },
								{ attribute: current_master_skill_3, setAttribute: setCurrentMasterSkill_3 },
							]}
						/>
						<ArkUpgradeInputRow
							prefix="培养目标"
							attributes={[
								{ attribute: target_level, setAttribute: setTargetLevel },
								{ attribute: target_elite, setAttribute: setTargetElite },
								{ attribute: target_all_skill, setAttribute: setTargetAllSkill },
								{ attribute: target_master_skill_1, setAttribute: setTargetMasterSkill_1 },
								{ attribute: target_master_skill_2, setAttribute: setTargetMasterSkill_2 },
								{ attribute: target_master_skill_3, setAttribute: setTargetMasterSkill_3 },
							]}
						/>
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
									{ content: '库存' },
									{ content: '升级项目' },
									{ content: '现等级' },
									{ content: '目标等级' },
									{ content: '所需材料', fullwidth: true },
								]
							}
							disable_hover
						/>
						{
							upgrades && upgrades.map((upgrade, index) => (
								<ArkUpgradeRow
									key={`${upgrade.operator}_${upgrade.attribute}_${upgrade.current}_${upgrade.target}_${index}`}
									upgrade={upgrade}
									upgrade_index={index}
									fulfilled={fulfilled_upgrades[index]}
									{...global_props}
								/>
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
					<div class={style.save}>添加全部到首页</div>
				</div>
			</div>
		</div>
	);
};

export default ArkOperatorTable;
