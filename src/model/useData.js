import { useReducer } from 'preact/hooks';
import Requirement from './Requirement';

const reducer = (state, action) => {
	switch (action.type) {
		case 'data.addRow':
			return {
				data: [...state.data, action.payload],
			};
		default:
			throw new Error(`Undefined action type: ${action.type}`);
	}
};

const useData = () => {
	const [state, dispatch] = useReducer(reducer, { data: [] });

	const addRow = (row) => {
		dispatch({
			type: 'data.addRow',
			payload: new Requirement(row, 4, []),
		});
	};

	return {
		state,
		dispatch,
		addRow,
	};
};

export default useData;
