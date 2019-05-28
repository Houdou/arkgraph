import React from 'preact';
import { useEffect, useMemo } from 'preact/hooks';
import style from './style';

import ArkTableHeader from './components/TableHeader';
import ArkNewUpgradeRow from './components/NewUpgradeRow';
import ArkUpgradeInputRow from './components/UpgradeInputRow';
import ArkStockRow from './components/StockRow';
import ArkSummaryRow from './components/SummaryRow';
import ArkShortageRow from './components/ShortageRow';
import ArkFocusMaterials from './sections/FocusMaterials';

import sumRequirements from '../../models/sumRequirements';
import sumShortage from '../../models/sumShortage';
import { MONEY, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../models/Resources';

const header_list = [
	{ name: '' },
	{ name: '干员' },
	{ name: '升级项目' },
	{ name: '现等级' },
	{ name: '下一等级' },
	MONEY,
	...EXP_TAPES,
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
];

const ArkTable = ({
	config,
	data,
}) => {
	const {
		state: { records, stock, focus_materials, compound_materials },
		load,
		addEmptyRow,
		updateRow,
		removeRow,
		setStockItem,
		toggleFocusMaterial,
		addFocusMaterials,
		clearFocusMaterials,
		toggleCompoundMaterial,
		compoundMaterial,
	} = data;

	useEffect(() => {
		load();
	}, []);

	const summary = useMemo(() => sumRequirements(records, compound_materials), [records, compound_materials]);
	const shortage = useMemo(() => sumShortage(stock, summary), [stock, summary]);

	const presented_materials = Object.keys(summary).filter(id => Boolean(summary[id]));

	const resources_filter = (index) => {
		const is_prefix = index < 5;
		const is_in_range = index < header_list.length;
		const is_item_presented = config.showAllResources
			|| presented_materials.includes(header_list[index].id)
			|| presented_materials.length === 0;

		return is_in_range && (is_prefix || is_item_presented);
	};

	const global_props = {
		config,
		stock,
		summary,
		shortage,
		focus_materials,
		compound_materials,
		records,
		header_list,
		header_skip: 5,
		resources_filter,
	};

	return (
		<div class={style.wrapper}>
			<div class={style.table}>
				<ArkTableHeader
					toggleFocusMaterial={toggleFocusMaterial}
					{...global_props}
				/>
				<ArkStockRow
					stock={stock}
					setStockItem={setStockItem}
					{...global_props}
				/>
				<ArkSummaryRow summary={summary} {...global_props} />
				<ArkShortageRow shortage={shortage} {...global_props} />
				{
					records && records.map((record, index) => (
						<ArkUpgradeInputRow
							key={`${record.operator}_${record.attribute}_${record.current}_${record.target}_${index}`}
							record={record}
							record_index={index}
							update={updateRow}
							remove={removeRow}
							{...global_props}
						/>
					))
				}
				<ArkNewUpgradeRow
					addEmptyRow={addEmptyRow}
					{...global_props}
				/>
			</div>
			<ArkFocusMaterials
				stock={stock}
				toggleFocusMaterial={toggleFocusMaterial}
				addFocusMaterials={addFocusMaterials}
				clearFocusMaterials={clearFocusMaterials}
				toggleCompoundMaterial={toggleCompoundMaterial}
				compoundMaterial={compoundMaterial}
				{...global_props}
			/>
		</div>
	);
};

export default ArkTable;
