import { useState } from 'preact/hooks';

const useRecords = () => {
	const [records, setRecords] = useState([]);

	const addRecord = (record) => {
		setRecords([...records, record]);
	};

	const removeRecord = (index) => {
		const remains = records.splice(index, 1);
		setRecords(remains);
	};

	const clearRecords = () => {
		setRecords([]);
	};

	return {
		records,
		setRecords,
		addRecord,
		removeRecord,
		clearRecords
	};
};

export default useRecords;
