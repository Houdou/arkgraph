import React from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import style from '../style';

import ArkFuseInputCell from '../../../components/fuseInputCell';

const ArkOperatorInput = ({
	operator,
	setOperator,
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
				custom_class={style.operator_input_cell}
				inputRef={operatorInputRef}
				value={operator} onChange={value => setOperator(value)}
				onClick={() => operatorInputRef.current && operatorInputRef.current.select()}
			/>
		</div>
	);
};

export default ArkOperatorInput;
