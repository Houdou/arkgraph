import React from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import style from '../style';

import ArkFuseInputCell, { searchAll } from '../../../components/fuseInputCell';

const ArkOperatorInput = ({
	locale,
	showExtendedData,
	operator,
	setOperatorId,
	setQueryList,
}) => {
	const operatorInputRef = useRef(null);

	useEffect(() => {
		if (!operator) {
			operatorInputRef.current && operatorInputRef.current.focus();
		}
	}, []);

	return (
		<div class={style.operator_input} >
			<ArkFuseInputCell
				locale={showExtendedData ? `${locale}_extended` : locale}
				custom_class={style.operator_input_cell}
				inputRef={operatorInputRef}
				value={operator}
				onChange={({ unique_id, name }) => setOperatorId(unique_id)}
				onChangeRaw={query => { setQueryList && setQueryList(searchAll(query, locale)) }}
				onClick={() => operatorInputRef.current && operatorInputRef.current.select()}
			/>
		</div>
	);
};

export default ArkOperatorInput;
