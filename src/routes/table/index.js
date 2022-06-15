import React from 'preact';
import { useEffect, useMemo } from 'preact/hooks';
import style from './style';
import cn from 'classnames';

import ArkTableHeader from './components/TableHeader';
import ArkNewUpgradeRow from './components/NewUpgradeRow';
import ArkUpgradeInputRow from './components/UpgradeInputRow';
import ArkStockRow from './components/StockRow';
import ArkSummaryRow from './components/SummaryRow';
import ArkShortageRow from './components/ShortageRow';
import ArkFocusMaterials from './sections/FocusMaterials';
import ArkFilterSettings from './sections/FilterSettings';
import ArkUpgradeRowHeaders from './sections/UpgradeRowHeaders';
import ArkSortingPanel from './sections/SortingPanel';

import sumRequirements from '../../models/sumRequirements';
import sumShortage from '../../models/sumShortage';
import checkFulFillment from '../../models/checkFulFillment';
import { MONEY, PURCHASE_CREDIT, EXP, MOD_TOKENS, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../models/Resources';

const header_list = [
	{ name: '选择' },
	{ name: '移除' },
	{ name: '完成' },
	{ name: '隐藏' },
	{ name: '干员' },
	{ name: '升级项目' },
	{ name: '现等级' },
	{ name: '下一等级' },
	MONEY,
	PURCHASE_CREDIT,
	EXP,
	...EXP_TAPES,
	...SKILL_BOOKS,
	...MOD_TOKENS,
	...MATERIALS,
	...CHIPS,
];

const ArkTable = ({
	ir,
	config,
	data,
	drops,
	toggleShowFilter,
	setFilters,
	clearFilters,
}) => {
	const {
		state: { records, stock, focus_materials, compound_materials },
		load,
		addEmptyRow,
		addLastRow,
		updateRow,
		toggleHiddenAll,
		completeRow,
		removeRow,
		moveRows,
		clearSelection,
		sortRecords,
		setStockItem,
		adjustStockItem,
		toggleFocusMaterial,
		addFocusMaterials,
		setFocusMaterials,
		clearFocusMaterials,
		toggleCompoundMaterial,
		compoundMaterial,
	} = data;

	useEffect(() => {
		load();
	}, []);

	const summary = useMemo(
		() => sumRequirements(records, stock, compound_materials),
		[records.filter(record => !record.hidden).length, records.filter(record => record.selected).length, stock, compound_materials]
	);
	const shortage = sumShortage(stock, summary, compound_materials, ir);

	const fulfillment_statuses = useMemo(() => checkFulFillment({
		records,
		stock,
		compound_materials,
	}), [records, stock, compound_materials]);

	const presented_materials = Object.keys(summary).filter(id => Boolean(summary[id]));
	const header_skip = 8;

	const {
		showFilter,
		filters,
	} = config;

	const material_filter = material => filters.every(
		filter => Boolean(material[filter.field] && filter.flags[material[filter.field]])
	);

	const resources_filter = (index) => {
		const is_prefix = index < header_skip;
		const is_in_range = index < header_list.length;
		const is_item_presented = config.showAllResources
			|| presented_materials.length === 0
			|| presented_materials.includes(header_list[index].id);

		const is_filtered = is_prefix || material_filter(header_list[index]);

		return is_in_range
			&& (is_prefix || is_item_presented || filters.length > 0)
			&& (config.showAllResources || filters.length === 0 || is_filtered);
	};

	const filter_props = {
		header_list,
		header_skip,
		resources_filter,
	};

	return (
		<div class={style.wrapper}>
			<div class={cn(
				style.table,
				{
					[style.hide_focus_materials]: !config.showFocusMaterials,
				}
			)}
			>
				<ArkTableHeader
					ir={ir}
					config={config}
					focus_materials={focus_materials}
					toggleFocusMaterial={toggleFocusMaterial}
					{...filter_props}
				/>
				<ArkStockRow
					ir={ir}
					stock={stock}
					setStockItem={setStockItem}
					{...filter_props}
				/>
				<ArkShortageRow
					ir={ir}
					shortage={shortage}
					{...filter_props}
				/>
				<ArkSummaryRow
					ir={ir}
					summary={summary}
					toggleHiddenAll={toggleHiddenAll}
					sortRecords={sortRecords}
					{...filter_props}
				/>
				{
					records && records.map((record, index) => (
						<ArkUpgradeInputRow
							ir={ir}
							showExtendedData={config.showExtendedData}
							key={`${record.operator_id}_${record.attribute}_${record.current}_${record.target}_${record.hidden}_${record.selected}_${index}`}
							record={record}
							record_index={index}
							update={updateRow}
							remove={removeRow}
							complete={completeRow}
							fulfillment_status={fulfillment_statuses[index]}
							{...filter_props}
						/>
					))
				}
				<ArkNewUpgradeRow
					addEmptyRow={addEmptyRow}
					addLastRow={addLastRow}
					{...filter_props}
				/>
				{
					config.tableRowHeader && records && (
						<ArkUpgradeRowHeaders
							ir={ir}
							config={config}
							records={records}
							addLastRow={addLastRow}
							addEmptyRow={addEmptyRow}
							updateRow={updateRow}
							removeRow={removeRow}
							completeRow={completeRow}
							fulfillment_statuses={fulfillment_statuses}
							summary={summary}
							toggleHiddenAll={toggleHiddenAll}
							sortRecords={sortRecords}
							{...filter_props}
						/>
					)
				}
			</div>
			<ArkFocusMaterials
				ir={ir}
				config={config}
				focus_materials={focus_materials}
				toggleFocusMaterial={toggleFocusMaterial}
				addFocusMaterials={addFocusMaterials}
				setFocusMaterials={setFocusMaterials}
				clearFocusMaterials={clearFocusMaterials}
				compound_materials={compound_materials}
				toggleCompoundMaterial={toggleCompoundMaterial}
				compoundMaterial={compoundMaterial}
				stock={stock}
				adjustStockItem={adjustStockItem}
				summary={summary}
				shortage={shortage}
				drops={drops}
			/>
			<ArkSortingPanel
				ir={ir}
				config={config}
				records={records}
				moveRows={moveRows}
				clearSelection={clearSelection}
				{...filter_props}
			/>
			{
				showFilter && (
					<ArkFilterSettings
						ir={ir}
						addEmptyRow={addEmptyRow}
						addLastRow={addLastRow}
						filters={filters}
						toggleShowFilter={toggleShowFilter}
						setFilters={setFilters}
					/>
				)
			}
		</div>
	);
};

export default ArkTable;
