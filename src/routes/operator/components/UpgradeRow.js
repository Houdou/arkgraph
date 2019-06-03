import React from 'preact';
import style from '../style';
import cn from 'classnames';

import ArkItem from '../../../components/item';
import ArkCell from '../../../components/cell';
import ArkButton from '../../../components/button';
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
			<ArkButton>
				<img src="../../../assets/icons/tick.png" alt="tick" style={{
					height: '20px',
					opacity: fulfilled ? 1 : 0.2,
				}}
				/>
			</ArkButton>
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
							<ArkItem
								id={resource}
								tier={`T${resource.substr(2, 1)}`}
								scale={0.25}
							/>
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

	return (
		<ArkRow
			cells={
				[
					StockIndicator,
					{ content: skill_render_map[attribute] ? `${skill_render_map[attribute]}专精` : attribute },
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
