import { useReducer } from 'preact/hooks';

const STORAGE_KEY =  'Towa_ArkTable_Config';
export const STORAGE_VERSION =  '1.0.4';

const default_config = {
	showAllResources: false,
	showMaterialIcons: true,
};

const reducer = (state, action) => {
	let newState = state;
	switch (action.type) {
		case 'config.toggleShowAllResources': {
			newState = {
				...state,
				showAllResources: action.payload,
			};
			break;
		}
		case 'config.toggleShowMaterialIcons': {
			newState = {
				...state,
				showMaterialIcons: action.payload,
			};
			break;
		}
		case 'config.load': {
			const json = window.localStorage.getItem(STORAGE_KEY);
			try {
				if (json) {
					const loaded = JSON.parse(json);
					if (typeof loaded !== 'object')
						throw new Error('Failed to load save');

					return loaded;
				}
			} catch (err) {
				window.localStorage.removeItem(STORAGE_KEY);
				return default_config;
			}
			break;
		}
		default:
			throw new Error(`Undefined action type: ${action.type}`);
	}

	if (action.type !== 'config.load') {
		// TODO: Trim storage
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
			...newState,
			version: STORAGE_VERSION,
		}));
	}
	return newState;
};

const useData = () => {
	const [state, dispatch] = useReducer(reducer, default_config);

	const load = () => {
		dispatch({
			type: 'config.load',
		});
	};

	const toggleShowAllResources = (toggle) => {
		dispatch({
			type: 'config.toggleShowAllResources',
			payload: toggle,
		});
	};

	const toggleShowMaterialIcons = (toggle) => {
		dispatch({
			type: 'config.toggleShowMaterialIcons',
			payload: toggle,
		});
	};

	return {
		config: state,
		dispatch,
		load,
		toggleShowAllResources,
		toggleShowMaterialIcons,
	};
};

export default useData;
