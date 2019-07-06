import React from 'preact';

import ArkInputCell from '../../../components/inputCell';
import ArkRow from '../../../components/row';
import ArkCell from '../../../components/cell';

import { EXP, EXP_TAPES } from '../../../models/Resources';

const ArkStockRow = ({
	stock,
	setStockItem,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const StockInput = ({ resource, tabIndex }) => (
		<ArkInputCell
			name={resource}
			value={Number(stock[resource.id]) || 0}
			onChange={quantity => {
				setStockItem(resource.id, quantity);
			}}
			tabIndex={tabIndex}
		/>
	);

	let tab_index_count = 1;
	const stock_inputs = Array.from(header_list)
		.splice(header_skip, header_list.length - header_skip)
		.map((e, i) => {
			let tab_index = -1;
			if (resources_filter(i + header_skip) && e.id !== EXP.id) {
				tab_index = tab_index_count++;
			}
			return (props) => {
				if (e.id === EXP.id) {
					const exp_sum = EXP_TAPES
						.map(tape => (stock[tape.id] || 0) * tape.value)
						.reduce((a, b) => a + b, 0);
					return (
						<ArkCell content={exp_sum} mobile_long_text={exp_sum > 99999} />
					);
				}
				return (<StockInput resource={e} tabIndex={tab_index} {...props} />);
			};
		});

	return (
		<ArkRow
			cells={
				[
					{ content: '', halfwidth: true },
					{ content: '', halfwidth: true },
					{ content: '', halfwidth: true },
					{ content: '', force_no_shrink: true },
					{ content: '', force_no_shrink: true },
					{ content: '' },
					{ content: '库存' },
					...stock_inputs,
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkStockRow;
