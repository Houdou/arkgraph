import React from 'preact';
import { useEffect, useMemo } from 'preact/hooks';
import style from './style';

import ArkTableHeader from './components/TableHeader';
import ArkNewUpgradeRow from './components/NewUpgradeRow';
import ArkUpgradeInputRow from './components/UpgradeInputRow';
import ArkStockRow from './components/StockRow';
import ArkSummaryRow from './components/SummaryRow';

import sumRequirements from '../../models/sumRequirements';
import { MONEY, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../models/Resources';

const header_list = [
	{ name: '☰' },
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
		state: { records, stock },
		load,
		addEmptyRow,
		updateRow,
		removeRow,
		setStockItem,
	} = data;

	useEffect(() => {
		load();
	}, []);

	const summary = useMemo(() => sumRequirements(records), [records]);
	const presented = Object.keys(summary);

	const resources_filter = (index) => {
		const is_prefix = index < 5;
		const is_in_range = index < header_list.length;

		const is_item_presented = config.showAllResources || presented.includes(header_list[index].id) || presented.length === 0;

		return is_in_range && (is_prefix || is_item_presented);
	};

	const global_props = {
		config,
		records,
		header_list,
		header_skip: 5,
		resources_filter,
	};

	return (
		<div class={style.table}>
			<ArkTableHeader {...global_props} />
			<ArkStockRow
				stock={stock}
				setStockItem={setStockItem}
				{...global_props}
			/>
			<ArkSummaryRow summary={summary} {...global_props} />
			{
				records && records.map((record, index) => (
					<ArkUpgradeInputRow
						record={record}
						record_index={index}
						update={(row) => updateRow(index, row)}
						remove={() => removeRow(index)}
						{...global_props}
					/>
				))
			}
			{
				<ArkNewUpgradeRow
					addEmptyRow={addEmptyRow}
					{...global_props}
				/>
			}
		</div>
	);
};

export default ArkTable;
