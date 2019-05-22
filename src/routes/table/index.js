import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import style from './style';

import ArkTableHeader from './components/TableHeader';
import ArkUpgradeRow from './components/UpgradeRow';
import ArkUpgradeInputRow from './components/UpgradeInputRow';
import ArkStockRow from './components/StockRow';
import ArkSummaryRow from './components/SummaryRow';

import useData from '../../models/useData';
import Upgrade from '../../models/Upgrade';
import { ATTRIBUTES } from '../../models/Attributes';
import { RESOURCES, MONEY, MATERIALS, SKILL_BOOKS, CHIPS } from '../../models/Resources';

const header_list = [
	{ name: '名称' },
	{ name: '升级项目' },
	{ name: '现等级' },
	{ name: '下一等级' },
	MONEY,
	...SKILL_BOOKS,
	...MATERIALS,
	...CHIPS,
];

const ArkTable = (props) => {
	const {
		state: { data },
		addRow,
	} = useData();

	useEffect(() => {
		addRow(
			new Upgrade(
				'陨星',
				ATTRIBUTES.SKILL_LEVEL,
				6,
				7,
				[
					{
						resource: RESOURCES['S-3-1'],
						quantity: 6,
					},
					{
						resource: RESOURCES['M-3-2'],
						quantity: 2,
					},
					{
						resource: RESOURCES['M-3-7'],
						quantity: 4,
					},
				]
			)
		);
	}, []);

	const summary = data.map(record => record.requirements).reduce((prev, next) => {
		next.forEach(requirement => {
			prev[requirement.resource.id] = prev[requirement.resource.id] || 0;
			prev[requirement.resource.id] += requirement.quantity;
		});
		return prev;
	}, {});

	const resources_filter = (index) =>
		index < header_list.length && (
			!header_list[index].tier || header_list[index].tier === 'T4'
		);

	const global_props = {
		header_list,
		header_skip: 4,
		resources_filter,
	};

	return (
		<div class={style.table}>
			<ArkTableHeader {...global_props} />
			<ArkStockRow {...global_props} />
			<ArkSummaryRow summary={summary} {...global_props} />
			{
				data && data.map(record => (
					<ArkUpgradeRow
						record={record}
						{...global_props}
					/>
				))
			}
			{
				<ArkUpgradeInputRow
					{...global_props}
				/>
			}
		</div>
	);
};

export default ArkTable;
