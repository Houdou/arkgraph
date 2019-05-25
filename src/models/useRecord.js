import { useState } from 'preact/hooks';

import processRecord from './processRecord';

const useRecord = (init_values) => {
	const init_record = Object.assign(
		{ operator: null, attribute: null, current: 0, target: 1, requirements: [] },
		init_values,
		{ requirements: processRecord(init_values).requirements }
	);
	const [record, setRecord_raw] = useState(init_record);

	const setRecord = (to_update) => {
		const processed_record = processRecord(to_update);
		setRecord_raw(processed_record);
		return processed_record;
	};

	const setOperator = (operator) => setRecord({
		...record,
		operator,
	});
	const setAttribute = (attribute) => setRecord({
		...record,
		attribute,
	});
	const setCurrent = (current) => setRecord({
		...record,
		current,
	});

	return {
		record,
		setOperator,
		setAttribute,
		setCurrent,
	};
};

export default useRecord;
