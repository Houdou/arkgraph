import React from 'preact';
import { useState, useEffect, useMemo } from 'preact/hooks';
import style from './style';
import cn from 'classnames';

import ArkLevelInput from './components/LevelInput';
import ArkMaterialsGroup from '../../components/materialsGroup';
import PenguinLink from '../../components/penguinLink';
import ArkPlanner from './sections/ArkPlanner';

import sumRequirements from '../../models/sumRequirements';
import { LEVELS } from '../../models/Levels';

import { getLevelMaterials } from './getLevelMaterials';
import { material_grouping_options, material_filter_options, material_list } from './options';

const excluding_list = [
	'LS-1',
	'LS-2',
	'LS-3',
	'LS-4',
	'LS-5',
	'AP-1',
	'AP-2',
	'AP-3',
	'AP-4',
	'AP-5',
	'CE-1',
	'CE-2',
	'CE-3',
	'CE-4',
	'CE-5',
	'PR-A-1',
	'PR-B-1',
	'PR-C-1',
	'PR-D-1',
	'PR-A-2',
	'PR-B-2',
	'PR-C-2',
	'PR-D-2',
];

const item_scale = 0.42;

const ArkFarming = ({
	ir,
	config,
	data,
	planner_service,
	level_id: level_query,
}) => {
	const {
		state: { stock, records, compound_materials },
		load,
		adjustStockItem,
		setStockItem,
	} = data;

	const summary = useMemo(() => sumRequirements(records, stock, compound_materials), [records, stock, compound_materials]);

	const [level_id, setLevelId_raw] = useState(global.level_query);
	const [grouping_type, setGroupingType_raw] = useState(global.grouping_type || 'default');
	const [filter_type, setFilterType_raw] = useState(global.filter_type || 'shortage');

	const filters = {
		shortage: item => summary[item.id] && Math.max(summary[item.id] - (stock[item.id] || 0), 0) > 0,
		required: item => summary[item.id],
		exceeded: item => Math.max((stock[item.id] || 0) - summary[item.id], 0) > 0,
	};

	const itemFilter = filters[filter_type] || null;

	const setLevelId = (id) => {
		if (id && typeof id === 'string') {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'farming_level_filter',
					eventAction: 'query',
					eventLabel: id,
				});
			} catch (err) {}
		}
		try {
			if (window.location.pathname !== `/farming/${id}`) {
				window.history.pushState(null, window.document.title, `/farming/${id}`);
			}
		} catch (err) {}
		setLevelId_raw(id);
		global.level_query = id;
	};

	const setGroupingType = (type) => {
		if (type && typeof type === 'string') {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'farming_grouping_type',
					eventAction: 'set',
					eventLabel: type,
				});
			} catch (err) {}
		}
		setGroupingType_raw(type);
		global.grouping_type = type;
	};

	const setFilterType = (type) => {
		if (type && typeof type === 'string') {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'farming_filter_type',
					eventAction: 'set',
					eventLabel: type,
				});
			} catch (err) {}
		}
		setFilterType_raw(type);
		global.filter_type = type;
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
						<span>{ir('farming-stage-stage', 'Stage')}</span>
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
								<span>{ir('farming-drop-drop', 'Drop')}</span>
							</div>
							<div class={style.drops}>
								<div class={style.penguin_link}>
									{
										!excluding_list.includes(level.id) && (
											<PenguinLink category="stage" id={`${level.zone_id}/${level.unique_id}${level.is_perm ? '_perm' : ''}`} render={ir('penguin-check_full_drop_rate', 'Check full drop rate')} />
										)
									}
								</div>
								<ArkMaterialsGroup
									ir={ir}
									stock={stock}
									summary={summary}
									resources={level_drop_resources.resources}
									item_scale={item_scale}
									adjustStockItem={adjustStockItem}
									setStockItem={setStockItem}
									groups={{
										normal_drop: { render: 'farming-drop-normal_drop', list: level_drop_resources.normal_drop },
										special_drop: { render: 'farming-drop-special_drop', list: level_drop_resources.special_drop },
										extra_drop: { render: 'farming-drop-extra_drop', list: level_drop_resources.extra_drop },
									}}
								/>
							</div>
						</div>
					)
				}
				<div class={style.section}>
					<div class={style.section_header}>
						<span>{ir('farming-requirements-requirements', 'Requirements')}</span>
					</div>
					<div class={style.stock_options}>
						<span class={style.stock_options_header}>{ir('farming-requirements-display', 'Display')}</span>
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
											<span>{ir(grouping_option.render)}</span>
										</div>
									))
							}
						</div>
					</div>
					<div class={style.stock_options}>
						<span class={style.stock_options_header}>{ir('farming-requirements-filter', 'Filter')}</span>
						<div class={style.material_grouping_options}>
							{
								Object.entries(material_filter_options)
									.map(([filter_option_type, filter_option]) => (
										<div
											class={cn(
												style.material_filter_option,
												{
													[style.material_filter_option_active]: filter_type === filter_option_type,
												}
											)}
											onClick={e => {
												setFilterType(filter_option_type);
											}}
										>
											<span>{ir(filter_option.render)}</span>
										</div>
									))
							}
						</div>
					</div>
					<div class={style.stock}>
						<ArkMaterialsGroup
							ir={ir}
							stock={stock}
							summary={summary}
							resources={material_list}
							item_scale={item_scale}
							adjustStockItem={adjustStockItem}
							setStockItem={setStockItem}
							groups={material_grouping_options[grouping_type].groups}
							filter={itemFilter}
							filter_type={filter_type}
						/>
					</div>
				</div>
				<div class={style.section}>
					<div class={style.section_header}>
						<span>{ir('farming-planner-planner', 'Planner')}</span>
					</div>
					<div class={style.planner}>
						<ArkPlanner
							ir={ir}
							records={records}
							stock={stock}
							summary={summary}
							planner_service={planner_service}
							setLevelId={setLevelId}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArkFarming;
