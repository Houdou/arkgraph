import React from 'preact';
import style from '../style';

import ArkItem from '../../../components/item';

const ArkCompoundSideProductsRow= ({
	compound_data,
	stock,
	adjustStockItem,
}) => {
	const {
		side_products,
	} = compound_data;

	return (
		<div class={style.compound_side_product_items}>
			{
				side_products.map(({ resource, quantity }) => (
					<div
						class={style.side_product_item}
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();
							adjustStockItem(resource, e.shiftKey ? 10 : 1);
						}}
						onContextMenu={e => {
							e.preventDefault();
							e.stopPropagation();
							adjustStockItem(resource, e.shiftKey ? -10 : -1);
						}}
					>
						<ArkItem
							id={resource}
							tier={`T${resource.substr(2, 1)}`}
							scale={0.4}
							quantity={stock[resource] || 0}
						/>
					</div>
				))
			}
		</div>
	);
};

export default ArkCompoundSideProductsRow;
