import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import style from './style';

import ArkTableHeader from './components/TableHeader';

import useData from '../../model/useData';

const ArkTable = (props) => {
	const {
		state: { data },
		addRow,
	} = useData();

	useEffect(() => {
		addRow({});
	}, []);

	return (
		<div class={style.table}>
			<ArkTableHeader />
			{
				data && data.map(record => {
					console.log(record);
				})
			}
		</div>
	);
};

export default ArkTable;
