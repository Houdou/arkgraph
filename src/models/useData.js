import { useReducer } from 'preact/hooks';

import Upgrade from './Upgrade';

const STORAGE_KEY =  'Towa_ArkTable_Save';
const STORAGE_VERSION =  '1.0.0';

const reducer = (state, action) => {
	let newState = state;
	switch (action.type) {
		case 'data.addRow': {
			const newRow = new Upgrade(...action.payload);
			newState = {
				...state,
				data: [...state.data, newRow],
			};
			break;
		}
		case 'data.updateRow': {
			const newData = Array.from(state.data);
			newData.splice(action.payload.index, 1, action.payload.row);
			newState = {
				...state,
				data: newData,
			};
			break;
		}
		case 'data.removeRow': {
			const newData = Array.from(state.data);
			newData.splice(action.payload, 1);
			newState = {
				...state,
				data: newData,
			};
			break;
		}
		case 'data.setStockItem':
			newState = {
				...state,
				stock: {
					...state.stock,
					...action.payload,
				},
			};
			break;
		case 'data.setStockBulk':
			newState = {
				...state,
				stock: action.payload,
			};
			break;
		case 'data.load': {
			const json = window.localStorage.getItem(STORAGE_KEY);
			try {
				if (json) {
					const loaded = JSON.parse(json);
					if (!loaded.data || !loaded.stock)
						throw new Error('Failed to load save');

					return loaded;
				}
			} catch (err) {
				window.localStorage.removeItem(STORAGE_KEY);
				return { data: [], stock: {} };
			}
			break;
		}
		default:
			throw new Error(`Undefined action type: ${action.type}`);
	}

	if (action.type !== 'data.load') {
		// TODO: Trim storage
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
			...newState,
			version: STORAGE_VERSION,
		}));
	}
	return newState;
};

const useData = () => {
	const [state, dispatch] = useReducer(reducer, { data: [], stock: {} });

	const load = () => {
		dispatch({
			type: 'data.load',
		});
	};

	const setStockItem = (id, quantity) => {
		dispatch({
			type: 'data.setStockItem',
			payload: {
				[id]: quantity,
			},
		});
	};

	const setStockBulk = (newStock) => {
		dispatch({
			type: 'dat.setStockBuld',
			payload: newStock,
		});
	};

	const addRow = (...row) => {
		dispatch({
			type: 'data.addRow',
			payload: row,
		});
	};

	const addEmptyRow = () => {
		dispatch({
			type: 'data.addRow',
			payload: [],
		});
	};

	const updateRow = (index, row) => {
		dispatch({
			type: 'data.updateRow',
			payload: { index, row },
		});
	};

	const removeRow = (index) => {
		dispatch({
			type: 'data.removeRow',
			payload: index,
		});
	};

	return {
		state,
		dispatch,
		load,
		addRow,
		addEmptyRow,
		updateRow,
		removeRow,
		setStockItem,
		setStockBulk,
	};
};

export default useData;
