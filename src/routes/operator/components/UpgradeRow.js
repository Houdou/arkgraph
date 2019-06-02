import React from 'preact';
import style from '../style';

import ArkCell from '../../../components/cell';
import ArkButton from '../../../components/button';
import ArkRow from '../../../components/row';
import ArkItem from '../../../components/item';

import useRecord from '../../../models/useRecord';

const ArkUpgradeRow = ({
	upgrade: init_record,
	upgrade_index,
	update,
	remove,
	complete,
	fulfilled,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const {
		record: {
			operator,
			attribute,
			current,
			target,
			requirements,
		},
	} = useRecord(init_record);

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
					.sort((prev, next) => {
						if (prev.resource === 'G-4-1')
							return 1;
						return -1;
					})
					.map(({ resource, quantity }) => (
						<div class={style.requirement_cell}>
							<ArkItem
								id={resource}
								tier={`T${resource.substr(2, 1)}`}
								scale={0.25}
							/>
						x{quantity}
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

export default ArkUpgradeRow;
