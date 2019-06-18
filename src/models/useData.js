import { useReducer } from 'preact/hooks';

import Upgrade from './Upgrade';
import { RESOURCES, MATERIALS, EXP } from './Resources';
import processRecord from './processRecord';

export const STORAGE_KEY =  'Towa_ArkTable_Save';
const STORAGE_VERSION =  '1.0.3';

const default_state = {
	records: [],
	stock: {},
	focus_materials: [],
	compound_materials: MATERIALS
		.filter(m => ['T5', 'T4'].includes(m.tier))
		.map(m => ({ id: m.id, options: {} })),
};

const save = (key, state) => {
	const data = {
		...state,
		records: (state.records || []).map(record => new Upgrade(record)),
	};
	window.localStorage.setItem(key, JSON.stringify({
		...data,
		version: STORAGE_VERSION,
	}));
};

const reducer = (state, action) => {
	let newState = state;
	switch (action.type) {
		case 'data.addRow': {
			const newRow = new Upgrade(action.payload);
			newState = {
				...state,
				records: [...state.records, processRecord(newRow)],
			};
			break;
		}
		case 'data.updateRow': {
			const records = [...state.records];
			records.splice(action.payload.index, 1, action.payload.row);
			newState = {
				...state,
				records,
			};
			break;
		}
		case 'data.completeRow': {
			const rowData = state.records[action.payload] || { requirements: [] };
			const requirements = rowData.requirements || [];
			const records = [...state.records];
			const stock = { ...state.stock };

			if (requirements.every(({ resource, quantity }) => resource === EXP.id || stock[resource] && stock[resource] >= quantity)) {
				requirements.forEach(({ resource, quantity }) => {
					if (resource === EXP.id) return true;
					stock[resource] = (stock[resource] || 0) - quantity;
				});
				records.splice(action.payload, 1);
			}
			newState = {
				...state,
				records,
				stock,
			};
			break;
		}
		case 'data.removeRow': {
			const records = [...state.records];
			records.splice(action.payload, 1);
			newState = {
				...state,
				records,
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
		case 'data.adjustStockItem': {
			const { id, delta } = action.payload;
			const stock = { ...state.stock };
			stock[id] = Math.max((stock[id] || 0) + delta, 0);
			newState = {
				...state,
				stock,
			};
			break;
		}
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
		case 'data.setFocusMaterials': {
			newState = {
				...state,
				focus_materials: [...action.payload],
			};
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
			const stock = { ...state.stock };
			if (Object.entries(material.formula).every(([id, quantity]) => stock[id] && stock[id] >= quantity)) {
				Object.entries(material.formula).forEach(([id, quantity]) => {
					stock[id] = (stock[id] || 0) - quantity;
				});
				stock[action.payload] = (stock[action.payload] || 0) + 1;
			}

			newState = {
				...state,
				stock,
			};
			break;
		}
		case 'data.load': {
			const json = action.payload || window.localStorage.getItem(STORAGE_KEY);
			try {
				if (json) {
					const loaded = JSON.parse(json);
					loaded.records = loaded.records.map(record => ({
						...record,
						attribute: record.attribute === '精英化' ? '精英阶段' : record.attribute,
					}));

					if (action.payload) {
						save(STORAGE_KEY, loaded);
					}

					return {
						...loaded,
						records: (loaded.records || []).map(processRecord),
					};
				}
			} catch (err) {
				if (action.payload) {
					err.details = '数据格式不正确，请检查';
					throw err;
				}
				window.localStorage.removeItem(STORAGE_KEY);
				return default_state;
			}
			break;
		}
		default:
			throw new Error(`Undefined action type: ${action.type}`);
	}

	if (action.type !== 'data.load') {
		save(STORAGE_KEY, newState);
	}
	return newState;
};

const useData = () => {
	const [state, dispatch] = useReducer(reducer, default_state);

	const load = (json) => dispatch({
		type: 'data.load',
		payload: json,
	});

	const setStockItem = (id, quantity) => {
		dispatch({
			type: 'data.setStockItem',
			payload: {
				[id]: quantity,
			},
		});
	};

	const adjustStockItem = (id, delta) => {
		dispatch({
			type: 'data.adjustStockItem',
			payload: {
				id,
				delta,
			},
		});
	};

	const setStockBulk = (stock) => {
		dispatch({
			type: 'dat.setStockBuld',
			payload: stock,
		});
	};

	const addRow = (row) => {
		dispatch({
			type: 'data.addRow',
			payload: row,
		});
	};

	const addEmptyRow = () => {
		dispatch({
			type: 'data.addRow',
			payload: {},
		});
	};

	const addLastRow = () => {
		dispatch({
			type: 'data.addRow',
			payload: {
				operator: global.last_operator,
			},
		});
	};

	const updateRow = (index, row) => {
		dispatch({
			type: 'data.updateRow',
			payload: { index, row },
		});
	};

	const completeRow = (index) => {
		dispatch({
			type: 'data.completeRow',
			payload: index,
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

	const setFocusMaterials = (materials = []) => {
		dispatch({
			type: 'data.setFocusMaterials',
			payload: materials,
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
		addLastRow,
		updateRow,
		completeRow,
		removeRow,
		setStockItem,
		adjustStockItem,
		setStockBulk,
		toggleFocusMaterial,
		addFocusMaterials,
		setFocusMaterials,
		clearFocusMaterials,
		toggleCompoundMaterial,
		compoundMaterial,
	};
};

export default useData;
