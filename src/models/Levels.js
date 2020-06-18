import levels from './levels.json';

import levels_i18n from '../i18n/levels.json';


const LEVELS = levels;

const UNAVAILABLE_LEVELS = levels.map(level => {
	const i18n_data = levels_i18n[level.unique_id];
	if (i18n_data.zh_CN && i18n_data.zh_CN.enabled) {
		if (!i18n_data.ja_JP) {
		  return i18n_data.code;
		}
	}
}).filter(Boolean);

export {
	LEVELS,
	UNAVAILABLE_LEVELS,
};
