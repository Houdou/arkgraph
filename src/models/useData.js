import { useReducer } from 'preact/hooks';

import Upgrade from './Upgrade';
import { RESOURCES } from './Resources';

const STORAGE_KEY =  'Towa_ArkTable_Save';
const STORAGE_VERSION =  '1.0.3';

const default_state = {
	records: [],
	stock: {},
	focus_materials: [],
	compound_materials: [],
};

const reducer = (state, action) => {
	let newState = state;
	switch (action.type) {
		case 'data.addRow': {
			const newRow = new Upgrade(...action.payload);
			newState = {
				...state,
				records: [...state.records, newRow],
			};
			break;
		}
		case 'data.updateRow': {
			const newData = Array.from(state.records);
			newData.splice(action.payload.index, 1, action.payload.row);
			newState = {
				...state,
				records: newData,
			};
			break;
		}
		case 'data.removeRow': {
			const newData = Array.from(state.records);
			newData.splice(action.payload, 1);
			newState = {
				...state,
				records: newData,
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
		case 'data.toggleFocusMaterial': {
			if (!newState.focus_materials.find(material => material.id === action.payload)) {
				newState = {
					...state,
					focus_materials: [...state.focus_materials, {
						id: action.payload,
						options: {},
					}],
				};
			} else {
				newState = {
					...state,
					focus_materials: state.focus_materials
						.filter(material => material.id !== action.payload),
				};
			}
			break;
		}
		case 'data.addFocusMaterials': {
			const new_focus_materials = state.focus_materials.filter(material =>
				!action.payload.materials.includes(material.id)
			);
			if (action.payload.index === -1) {
				newState = {
					...state,
					focus_materials: [...new_focus_materials, ...action.payload.materials.map(id => ({ id, options: {} }))],
				};
			} else {
				new_focus_materials.splice(action.payload.index + 1, 0, ...action.payload.materials.map(id => ({ id, options: {} })));
				newState = {
					...state,
					focus_materials: new_focus_materials,
				};
			}
			break;
		}
		case 'data.clearFocusMaterials':
			newState = {
				...state,
				focus_materials: [],
			};
			break;
		case 'data.toggleCompoundMaterial': {
			if (!newState.compound_materials.find(material => material.id === action.payload)) {
				newState = {
					...state,
					compound_materials: [...state.compound_materials, {
						id: action.payload,
						options: {},
					}],
				};
			} else {
				newState = {
					...state,
					compound_materials: state.compound_materials
						.filter(material => material.id !== action.payload),
				};
			}
			break;
		}
		case 'data.compoundMaterial': {
			const material = RESOURCES[action.payload];
			const { stock } = state;
			if (Object.entries(material.formula).every(([id, quantity]) => stock[id] && stock[id] > quantity)) {
				Object.entries(material.formula).forEach(([id, quantity]) => {
					stock[id] = (stock[id] || 0) - quantity;
					stock[action.payload] = (stock[action.payload] || 0) + 1;
				});
			}

			newState = {
				...state,
				stock,
			};
			break;
		}
		case 'data.load': {
			const json = window.localStorage.getItem(STORAGE_KEY);
			try {
				if (json) {
					const loaded = JSON.parse(json);
					if (!loaded.focus_materials) {
						// 1.0.1 -> 1.0.2 Patch
						if (loaded.version === '1.0.1') {
							loaded.focus_materials = [];
							loaded.version = '1.0.2';
						}
					}
					if (!loaded.compound_materials) {
						// 1.0.2 -> 1.0.3 Patch
						if (loaded.version === '1.0.2') {
							loaded.compound_materials = [];
							loaded.version = '1.0.3';
							return loaded;
						}
						throw new Error('Failed to load save');
					}

					return loaded;
				}
			} catch (err) {
				window.localStorage.removeItem(STORAGE_KEY);
				return default_state;
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
	const [state, dispatch] = useReducer(reducer, default_state);

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

	const toggleFocusMaterial = (material_id) => {
		dispatch({
			type: 'data.toggleFocusMaterial',
			payload: material_id,
		});
	};

	const addFocusMaterials = (materials = [], index = -1) => {
		dispatch({
			type: 'data.addFocusMaterials',
			payload: {
				materials,
				index,
			},
		});
	};

	const clearFocusMaterials = () => {
		dispatch({
			type: 'data.clearFocusMaterials',
		});
	};

	const toggleCompoundMaterial = (material_id) => {
		dispatch({
			type: 'data.toggleCompoundMaterial',
			payload: material_id,
		});
	};

	const compoundMaterial = (material_id) => {
		dispatch({
			type: 'data.compoundMaterial',
			payload: material_id,
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
		toggleFocusMaterial,
		addFocusMaterials,
		clearFocusMaterials,
		toggleCompoundMaterial,
		compoundMaterial,
	};
};

export default useData;
