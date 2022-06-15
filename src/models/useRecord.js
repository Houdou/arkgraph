import { useState } from 'preact/hooks';

import processRecord from './processRecord';

const useRecord = (init_values) => {
	const init_record = Object.assign(
		{
			operator_id: null,
			attribute: null,
			current: 0,
			target: 1,
			requirements: [],
			hidden: false,
			selected: false
		},
		init_values,
		{ requirements: processRecord(init_values).requirements }
	);
	const [record, setRecord_raw] = useState(init_record);

	const setRecord = (to_update) => {
		const processed_record = processRecord(to_update);
		setRecord_raw(processed_record);
		return processed_record;
	};

	const setOperatorId = (operator_id) => setRecord({
		...record,
		operator_id,
	});
	const setAttribute = (attribute) => setRecord({
		...record,
		attribute,
	});
	const setCurrent = (current) => setRecord({
		...record,
		current,
	});
	const setTarget = (target) => setRecord({
		...record,
		target,
	});
	const setHidden = (hidden) => setRecord({
		...record,
		hidden: Boolean(hidden),
	});
	const setSelected = (selected) => setRecord({
		...record,
		selected: Boolean(selected),
	});

	return {
		record,
		setOperatorId,
		setAttribute,
		setCurrent,
		setTarget,
		setHidden,
		setSelected,
	};
};

export default useRecord;
