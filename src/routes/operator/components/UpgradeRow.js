import React from 'preact';
import style from '../style';
import cn from 'classnames';
import { Link } from 'preact-router/match';

import ArkItem from '../../../components/item';
import ArkCell from '../../../components/cell';
import ArkRow from '../../../components/row';

const ArkUpgradeRow = ({
	upgrade,
	upgrade_index,
	skill_render_map,
	fulfilled,
}) => {
	const {
		attribute,
		current,
		target,
		requirements,
	} = upgrade;

	const StockIndicator = (props) => (
		<ArkCell fullheight>
			{fulfilled && (
				<img
					src="../../../assets/icons/tick_invert.png" alt="tick"
					style={{
						height: '20px',
					}}
				/>
			)}
		</ArkCell>
	);

	const RequirementItems = (props) => (
		<ArkCell
			fullheight
			fullwidth
			style={{
				'justify-content': 'flex-start',
				'padding-left': '5px',
			}}
		>
			{
				requirements
					.sort((prev, next) => next.resource === 'G-4-1' ? - 1: 0)
					.map(({ resource, quantity }) => (
						<div class={style.requirement_cell}>
							<Link href={`/materials/${resource}`}>
								<ArkItem
									id={resource}
									tier={`T${resource.substr(2, 1)}`}
									scale={0.25}
								/>
							</Link>
							<span>x</span>
							<span
								class={cn(
									style.requirement_quantity,
									{
										[style.long_quantity]: resource !== 'G-4-1' && quantity.toString().length > 2,
									}
								)}
							>{quantity}</span>
						</div>
					))
			}
		</ArkCell>
	);

	const attribute_render = skill_render_map[attribute] ? `${skill_render_map[attribute]}` : attribute;
	const attribute_long_text = attribute_render.length > 5;

	return (
		<ArkRow
			cells={
				[
					StockIndicator,
					{ content: attribute_render, long_text: attribute_long_text },
					{ content: current },
					{ content: target },
					RequirementItems,
				]
			}
			style={{ height: '56px' }}
			fullheight
		/>
	);
};

export default ArkUpgradeRow;
