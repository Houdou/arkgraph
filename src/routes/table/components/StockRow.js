import React from 'preact';

import ArkInputCell from '../../../components/inputCell';
import ArkRow from '../../../components/row';

const ArkStockRow = ({
	record,
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
			if (resources_filter(i + header_skip)) {
				tab_index = tab_index_count++;
			}
			return (props) => (<StockInput resource={e} tabIndex={tab_index} {...props} />);
		});

	return (
		<ArkRow
			cells={
				[
					{ content: '', halfwidth: true },
					{ content: '' },
					{ content: '' },
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
