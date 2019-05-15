import { h } from 'preact';
// import { useEffect } from 'preact/hooks';
import style from './style';

import ArkRowHeader from './TableHeader';
import ArkRow from '../../components/row';

// import data from '../../model/data.json';
import useRecords from '../../model/useRecords';

const ArkTable = (props) => {
	const {
		records
	} = useRecords();

	return (
		<div class={style.table}>
			<ArkRowHeader />
			{
				Array(30).fill().map((_, i) => (
					<ArkRow
						cells={
							Array(15).fill().map((__, j) => {
								return j
									? { content: i * 10 + j }
									: { content: String.fromCharCode(i+65) };
							})
						}
					/>
				))
			}
			<ArkRow cells={records} />
		</div>
	);
};

export default ArkTable;
