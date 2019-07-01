import React from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style';
import cn from 'classnames';

import ArkLevelInput from './components/LevelInput';
import ArkMaterialGroup from './components/MaterialGroup';

import { LEVELS } from '../../models/Levels';
import { RESOURCES, MONEY, PURCHASE_CREDIT, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../models/Resources';

const getLevelMaterials = (level) => {
	if (!level) {
		return {
			resources: [],
			normal_drop: [],
			special_drop: [],
			extra_drop: [],
		};
	}

	let index = 0;
	const resources = [];
	const normal_drop = [];
	const special_drop = [];
	const extra_drop = [];
	level.normal_drop.forEach(m => {
		resources.push(RESOURCES[m.resource]);
		normal_drop.push(index++);
	});
	level.special_drop.forEach(m => {
		resources.push(RESOURCES[m.resource]);
		special_drop.push(index++);
	});
	level.extra_drop.forEach(m => {
		resources.push(RESOURCES[m.resource]);
		extra_drop.push(index++);
	});

	return {
		resources,
		normal_drop,
		special_drop,
		extra_drop,
	};
};

const material_list = [
	MONEY,
	PURCHASE_CREDIT,
	...EXP_TAPES,
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
];

const indexed_material_list = material_list.map((m, index) => ({
	material: m,
	index,
}));

const material_grouping_options = {
	default: {
		render: '全部',
		field: null,
		options: [],
		groups: {},
	},
	type: {
		render: '种类',
		field: 'type',
		options: [
			{ value: 'money', render: '货币' },
			{ value: 'tape', render: '作战记录' },
			{ value: 'rare', render: '高级材料' },
			{ value: 'alcohol', render: '醇' },
			{ value: 'manganese', render: '锰' },
			{ value: 'grind', render: '研磨石' },
			{ value: 'rma', render: 'RMA' },
			{ value: 'stone', render: '源岩' },
			{ value: 'device', render: '装置' },
			{ value: 'ester', render: '酯' },
			{ value: 'sugar', render: '糖' },
			{ value: 'iron', render: '异铁' },
			{ value: 'ketone', render: '酮' },
			{ value: 'skill', render: '技巧概要' },
			{ value: 'chip', render: '芯片' },
		],
		groups: {},
	},
	tier: {
		render: '等级',
		field: 'tier',
		options: [
			{ value: 'T5', render: '5级材料' },
			{ value: 'T4', render: '4级材料' },
			{ value: 'T3', render: '3级材料' },
			{ value: 'T2', render: '2级材料' },
			{ value: 'T1', render: '1级材料' },
		],
		groups: {},
	},
};

Object.entries(material_grouping_options)
	.forEach(([key, data]) => {
		if (!data.field) {
			return;
		}
		data.options.forEach(({ value, render }) => {
			material_grouping_options[key].groups[value] =
				{
					render,
					list: indexed_material_list
						.filter(({ material }) => material[data.field] === value)
						.map(({ index }) => index),
				};
		});
	});

// Special handling for chip
material_grouping_options.type.groups.chip.render = '助剂';
const profession_chip_index = material_grouping_options.type.groups.chip.list.splice(1, 3 * 8);
const professions = [
	{ value: 'pioneer', render: '先锋' },
	{ value: 'warrior', render: '近卫' },
	{ value: 'tank', render: '重装' },
	{ value: 'sniper', render: '狙击' },
	{ value: 'caster', render: '术师' },
	{ value: 'medic', render: '医疗' },
	{ value: 'support', render: '辅助' },
	{ value: 'special', render: '特种' },
];
professions.forEach(({ value, render }, index) => {
	material_grouping_options.type.groups[`chip_${value}`] = {
		render: `${render}芯片`,
		list: profession_chip_index.splice(0, 3),
	};
});

const item_scale = 0.42;

const ArkStockView = ({
	config,
	data,
	level_id: level_query,
}) => {
	const {
		state: { stock },
		load,
		adjustStockItem,
	} = data;

	const [level_id, setLevelId_raw] = useState(global.level_query);
	const [grouping_type, setGroupingType_raw] = useState(global.grouping_type || 'type');

	const setLevelId = (id) => {
		if (id && typeof id === 'string') {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'stock_level_filter',
					eventAction: 'query',
					eventLabel: id,
				});
			} catch (err) {}
		}
		setLevelId_raw(id);
		global.level_query = id;
	};

	const setGroupingType = (type) => {
		if (type && typeof type === 'string') {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'stock_grouping_type',
					eventAction: 'set',
					eventLabel: type,
				});
			} catch (err) {}
		}
		setGroupingType_raw(type);
		global.grouping_type = type;
	};

	useEffect(() => {
		load();
	}, []);

	// Run query from url
	useEffect(() => {
		const level = LEVELS.find(o => o.level === level_query
			|| o.unique_id === level_query);
		if (level) {
			setLevelId(level.level);
		}
	}, [level_query]);

	const level = LEVELS.find(o => o.level === level_id);
	const level_drop_resources = getLevelMaterials(level);

	return (
		<div class={style.wrapper}>
			<div class={style.page}>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>关卡筛选</span>
					</div>
					<ArkLevelInput
						level_id={level_id}
						setLevelId={setLevelId}
					/>
				</div>
				{
					level_id && (
						<div class={style.section}>
							<div class={style.section_header}>
								<span>掉落</span>
							</div>
							<div class={style.drop}>
								<ArkMaterialGroup
									stock={stock}
									resources={level_drop_resources.resources}
									item_scale={item_scale}
									adjustStockItem={adjustStockItem}
									groups={{
										normal_drop: { render: '普通掉落', list: level_drop_resources.normal_drop },
										special_drop: { render: '特殊掉落', list: level_drop_resources.special_drop },
										extra_drop: { render: '额外掉落', list: level_drop_resources.extra_drop },
									}}
								/>
							</div>
						</div>
					)
				}
				<div class={style.section}>
					<div class={style.section_header}>
						<span>库存</span>
					</div>
					<div class={style.stock_options}>
						<span class={cn(
							style.material_group_name,
							style.stock_options_header
						)}
						>显示</span>
						<div class={style.material_grouping_options}>
							{
								Object.entries(material_grouping_options)
									.map(([grouping_option_type, grouping_option]) => (
										<div
											class={cn(
												style.material_grouping_option,
												{
													[style.material_grouping_option_active]: grouping_type === grouping_option_type,
												}
											)}
											onClick={e => {
												setGroupingType(grouping_option_type);
											}}
										>
											<span>{grouping_option.render}</span>
										</div>
									))
							}
						</div>
					</div>
					<div class={style.stock}>
						<ArkMaterialGroup
							stock={stock}
							resources={material_list}
							item_scale={item_scale}
							adjustStockItem={adjustStockItem}
							groups={material_grouping_options[grouping_type].groups}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArkStockView;
