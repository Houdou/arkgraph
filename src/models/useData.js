import { useReducer } from 'preact/hooks';

import Upgrade from './Upgrade';
import { RESOURCES, MATERIALS, EXP } from './Resources';
import processRecord from './processRecord';

export const STORAGE_KEY = 'Towa_ArkTable_Save';
const STORAGE_VERSION = '2.5.0';

// V1 => V2 migration
import { findOperatorByName } from './Operators';
const ATTRIBUTE_MAPPING = {
	精0等级: 'LEVEL_ELITE_0',
	精1等级: 'LEVEL_ELITE_1',
	精2等级: 'LEVEL_ELITE_2',
	精英阶段: 'ELITE_RANK',
	技能等级: 'SKILL_LEVEL',
	技能1专精: 'MASTER_SKILL_1',
	技能2专精: 'MASTER_SKILL_2',
	技能3专精: 'MASTER_SKILL_3',
};

const default_state = {
	version: STORAGE_VERSION,
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
		case 'data.toggleHiddenAll': {
			const records = [...state.records.map(r => ({
				...r,
				hidden: action.payload,
			}))];
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
		case 'data.moveRows': {
			let sorted_records = [...state.records];
			const selected_records = state.records.filter(r => r.selected);
			const unselected_records = state.records.filter(r => !r.selected);
			if (selected_records.length === 0 || unselected_records.length === 0) {
				break;
			}

			const first_selected_index = state.records.findIndex(record => record.selected);
			const last_selected_index = state.records.findLastIndex(record => record.selected);
			const all_selection_grouped = selected_records.length <= 1 || Boolean(first_selected_index + selected_records.length - 1 === last_selected_index);

			switch (action.payload.type) {
				case 'to_first':
					sorted_records = [].concat(selected_records, unselected_records);
					break;
				case 'to_last':
					sorted_records = [].concat(unselected_records, selected_records);
					break;
				case 'up':
					sorted_records = [
						...state.records.filter((r, i) => i < first_selected_index - (all_selection_grouped ? 1 : 0) && !r.selected),
						...selected_records,
						...state.records.filter((r, i) => (i >= first_selected_index - (all_selection_grouped ? 1 : 0) && !r.selected)),
					];
					break;
				case 'down':
					sorted_records = [
						...state.records.filter((r, i) => i < last_selected_index + (all_selection_grouped ? 2 : 1) && !r.selected),
						...selected_records,
						...state.records.filter((r, i) => i >= last_selected_index + (all_selection_grouped ? 2 : 1) && !r.selected),
					];
					break;
				default:
					break;
			}

			newState = {
				...state,
				records: sorted_records,
			};
			break;
		}
		case 'data.clearSelection': {
			const records = [...state.records];
			newState = {
				...state,
				records: records.map(record => ({ ...record, selected: false })),
			};
			break;
		}
		case 'data.sortRecords': {
			const records = [...state.records];
			const sorted_records = records.sort(action.payload.sorting_func);
			newState = {
				...state,
				records: sorted_records,
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

					// V1 => V2
					if (loaded.version.startsWith('1')) {
						loaded.records = loaded.records.map(record => {
							const {
								operator: operator_name,
								attribute,
								...rest
							} = record;
							const {
								unique_id,
							} = findOperatorByName(operator_name);

							return {
								...rest,
								operator_id: unique_id,
								attribute: ATTRIBUTE_MAPPING[attribute],
							};
						});
						loaded.version = STORAGE_VERSION;
					}

					// Patch any => v2.5.0
					if (loaded.version !== '2.5.0') {
						[
							'M-5-6',
							'M-5-5',
							'M-4-16',
							'M-4-17',
							'M-4-18',
							'M-4-19'
						].forEach(material_id => {
							const patch = loaded.compound_materials.find(
								record => record.id === material_id
							);
							if (!patch) {
								loaded.compound_materials.push({ id: material_id, options: {} });
							}
						})
					}

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
			type: 'data.setStockBulk',
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
				operator_id: global.last_operator,
				attribute: global.last_attribute,
			},
		});
	};

	const updateRow = (index, row) => {
		dispatch({
			type: 'data.updateRow',
			payload: { index, row },
		});
	};

	const toggleHiddenAll = (hidden) => {
		dispatch({
			type: 'data.toggleHiddenAll',
			payload: hidden,
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

	const moveRows = (type) => {
		dispatch({
			type: 'data.moveRows',
			payload: {
				type,
			},
		});
	};

	const clearSelection = () => {
		dispatch({
			type: 'data.clearSelection',
			payload: {},
		});
	};

	const sortRecords = (sorting_func) => {
		dispatch({
			type: 'data.sortRecords',
			payload: {
				sorting_func,
			},
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
		toggleHiddenAll,
		completeRow,
		removeRow,
		moveRows,
		clearSelection,
		sortRecords,
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
