import React from 'preact';
import { Link } from 'preact-router/match';

import ArkCell from '../../../components/cell';
import ArkRow from '../../../components/row';

const DropRow= ({
	level,
	times,
	quantity,
	energy,
}) => {
	const LevelCell = () => (
		<Link href={`/stock/${level}`}>
			<ArkCell>
				<span>{level}</span>
			</ArkCell>
		</Link>
	);
	return (
		<ArkRow
			cells={
				[
					LevelCell,
					{ content: energy },
					{ content: `${~~(quantity / times * 1000) / 10}%` },
					{ content: ~~(energy * times / quantity * 100) / 100, fullwidth: true },
				]
			}
		/>
	);
};

export default DropRow;
