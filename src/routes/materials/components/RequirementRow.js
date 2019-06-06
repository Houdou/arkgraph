import React from 'preact';
import style from '../style';
import cn from 'classnames';

import ArkItem from '../../../components/item';
import ArkCell from '../../../components/cell';
import ArkRow from '../../../components/row';

import processRecord from './../../../models/processRecord';

const ArkRequirementRow = ({
	upgrade: init_record,
	upgrade_index,
	material_query,
	skill_render_map,
}) => {
	const {
		operator,
		attribute,
		current,
		target,
	} = init_record;

	const { requirements } = processRecord(init_record);

	const StockIndicator = (props) => (
		<ArkCell fullheight>
			{false && (
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
					.sort((a, b) => {
						if (b.resource === 'G-4-1') return -1;
						if (a.resource === material_query) return -1;
						return 0;
					})
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

	// const attribute_render = skill_render_map[attribute] ? `${skill_render_map[attribute]}` : attribute;
	// const attribute_long_text = attribute_render.length > 5;

	return (
		<ArkRow
			cells={
				[
					StockIndicator,
					{ content: operator },
					{ content: attribute },
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

export default ArkRequirementRow;
