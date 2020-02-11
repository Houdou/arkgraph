import React from 'preact';
import style from '../style';
import cn from 'classnames';
import { Link } from 'preact-router/match';

import ArkItem from '../../../components/item';
import ArkCell from '../../../components/cell';
import ArkRow from '../../../components/row';

const ArkCompoundRequirementsRow= ({
	compound,
	formula,
	sum,
	material_query,
}) => {
	const {
		result,
	} = compound;

	const CompoundItem = (props) => (
		<ArkCell
			fullheight
			style={{
				'justify-content': 'flex-start',
				'padding-left': '5px',
			}}
		>
			<div class={style.compound_cell}>
				<Link href={`/materials/${result}`}>
					<ArkItem
						id={result}
						tier={`T${result.substr(2, 1)}`}
						scale={0.25}
					/>
				</Link>
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
					<div class={style.requirement_cell}>
						<Link href={`/materials/${resource === 'G-4-1' ? '' : resource}`}>
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
									[style.long_quantity]: result !== 'G-4-1' && quantity.toString().length > 2,
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
					CompoundItem,
					{ content: sum || 0 },
					CompoundFormula,
				]
			}
			style={{ height: '56px' }}
			fullheight
		/>
	);
};

export default ArkCompoundRequirementsRow;
