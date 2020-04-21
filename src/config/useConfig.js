import { useReducer } from 'preact/hooks';

export const STORAGE_KEY =  'Towa_ArkTable_Config';
export const STORAGE_VERSION =  '2.2.8';

const default_config = {
	showAllResources: false,
	showFocusMaterials: true,
	showFilter: false,
	showExtendedData: false,
	filters: [],
	showExp: false,
	showAnnouncementCodeOnce: false,
	locale: window.localStorage.getItem('Towa_ArkTable_Lang') || 'zh_CN',
};

const reducer = (state, action) => {
	let newState = state;
	switch (action.type) {
		case 'config.setLanguage': {
			newState = {
				...state,
			};

			newState.locale = action.payload;
			break;
		}
		case 'config.toggleShowAllResources': {
			newState = {
				...state,
				showAllResources: action.payload,
			};

			if (action.payload) {
				newState.filters = [];
			}
			break;
		}
		case 'config.toggleShowFocusMaterials': {
			newState = {
				...state,
				showFocusMaterials: action.payload,
			};
			break;
		}
		case 'config.toggleShowFilter': {
			newState = {
				...state,
				showFilter: action.payload,
			};
			break;
		}
		case 'config.toggleShowExtendedData': {
			newState = {
				...state,
				showExtendedData: action.payload,
			};
			break;
		}
		case 'config.setFilters': {
			newState = {
				...state,
				filters: [...action.payload],
			};

			if ((action.payload || []).length > 0) {
				newState.showAllResources = false;
			}
			break;
		}
		case 'config.toggleShowExp': {
			newState = {
				...state,
				showExp: action.payload,
			};
			break;
		}
		case 'config.toggleShowAnnouncementCodeOnce': {
			newState = {
				...state,
				showAnnouncementCodeOnce: action.payload,
			};
			break;
		}
		case 'config.load': {
			const json = window.localStorage.getItem(STORAGE_KEY);
			try {
				if (json) {
					const loaded = JSON.parse(json);
					if (typeof loaded !== 'object') {
						throw new Error('Failed to load save');
					}

					// Patch any => v1.4.0
					if (!loaded.filters) {
						loaded.filters = [];
					}

					if (!loaded.locale) {
						loaded.locale = 'zh_CN';
					}

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

	const setLanguage = (language) => {
		dispatch({
			type: 'config.setLanguage',
			payload: language,
		});
	};

	const toggleShowAllResources = (toggle) => {
		dispatch({
			type: 'config.toggleShowAllResources',
			payload: toggle,
		});
	};

	const toggleShowFocusMaterials = (toggle) => {
		dispatch({
			type: 'config.toggleShowFocusMaterials',
			payload: toggle,
		});
	};

	const toggleShowFilter = (toggle) => {
		dispatch({
			type: 'config.toggleShowFilter',
			payload: toggle,
		});
	};

	const toggleShowExtendedData = (toggle) => {
		dispatch({
			type: 'config.toggleShowExtendedData',
			payload: toggle,
		});
	};

	const setFilters = (filters) => {
		dispatch({
			type: 'config.setFilters',
			payload: filters,
		});
	};

	const toggleShowExp = (toggle) => {
		dispatch({
			type: 'config.toggleShowExp',
			payload: toggle,
		});
	};

	const toggleShowAnnouncementCodeOnce = (toggle) => {
		dispatch({
			type: 'config.toggleShowAnnouncementCodeOnce',
			payload: toggle,
		});
	};

	return {
		config: state,
		dispatch,
		load,
		setLanguage,
		toggleShowAllResources,
		toggleShowFocusMaterials,
		toggleShowFilter,
		toggleShowExtendedData,
		setFilters,
		toggleShowExp,
		toggleShowAnnouncementCodeOnce,
	};
};

export default useData;
