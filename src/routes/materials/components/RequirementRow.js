import React from 'preact';
import style from '../style';
import cn from 'classnames';
import { Link } from 'preact-router/match';

import ArkItem from '../../../components/item';
import ArkCell from '../../../components/cell';
import ArkRow from '../../../components/row';

import { getOperatorName } from '../../../models/Operators';
import processRecord from '../../../models/processRecord';

const ArkRequirementRow = ({
	ir,
	upgrade: init_record,
	upgrade_index,
	material_query,
	skill_render_map,
}) => {
	const {
		operator_id,
		attribute,
		render,
		current,
		target,
	} = init_record;

	const { requirements } = processRecord(init_record);

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

	const attribute_text = render || ir(`attribute-${attribute.toLowerCase()}`);
	const operator_name = getOperatorName({ id: operator_id, locale: ir.locale });

	return (
		<ArkRow
			cells={
				[
					{ content: operator_name, href: `/operator/${operator_name}` },
					{ content: attribute_text, long_text: attribute_text.length > 4 },
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
