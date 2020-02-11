import React from 'preact';
import style from '../style';
import cn from 'classnames';

import ArkItem from '../../../components/item';
import ArkCell from '../../../components/cell';
import ArkRow from '../../../components/row';

const ArkCompoundRow = ({
	compound,
	material_id,
	formula,
	sum,
	material_query,
	stock,
	adjustStockItem,
}) => {
	const CompoundItem = (props) => (
		<ArkCell
			fullheight
			style={{
				'justify-content': 'flex-start',
				'padding-left': '5px',
			}}
		>
			<div class={style.compound_cell}
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					adjustStockItem(material_id, e.shiftKey ? 10 : 1);
				}}
				onContextMenu={e => {
					e.preventDefault();
					e.stopPropagation();
					adjustStockItem(material_id, e.shiftKey ? -10 : -1);
				}}
			>
				<ArkItem
					id={material_id}
					tier={`T${material_id.substr(2, 1)}`}
					scale={0.4}
					quantity={stock[material_id] || 0}
				/>
			</div>
		</ArkCell>
	);

	const CompoundFormula = (props) => (
		<ArkCell
			fullheight
			fullwidth
			style={{
				'justify-content': 'flex-start',
				'padding-left': '5px',
			}}
		>
			{
				Object.entries(formula).map(([resource, quantity]) => (
					<div
						class={style.compound_ingredient_cell}
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
						<span>
							<span>x</span>
							<span
								class={cn(
									style.requirement_quantity,
									{
										[style.long_quantity]: material_id !== 'G-4-1' && quantity.toString().length > 2,
									}
								)}
							>{quantity}</span>
						</span>
					</div>
				))
			}
		</ArkCell>
	);

	return (
		<ArkRow
			cells={
				[
					CompoundItem,
					CompoundFormula,
				]
			}
			style={{ height: '88px' }}
			fullheight
		/>
	);
};

export default ArkCompoundRow;
