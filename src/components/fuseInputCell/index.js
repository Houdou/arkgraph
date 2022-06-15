import React from 'preact';
import style from './style';
import cn from 'classnames';
import Fuse from 'fuse.js';

import { OPERATORS } from '../../models/Operators';
import operator_i18n from '../../i18n/operators.json';
const OPERATORS_LANG = {};

[
	'zh_CN',
	'en_US',
	'ja_JP',
	'ko_KR',
].forEach(lang => {
	OPERATORS_LANG[lang] = [];
	OPERATORS.forEach((operator) => {
		if (operator_i18n[operator.unique_id]) {
			const operator_lang = operator_i18n[operator.unique_id][lang];
			if (operator_lang && operator_lang.enabled) {
				OPERATORS_LANG[lang].push({
					unique_id: operator.unique_id,
					code: operator_i18n[operator.unique_id].code,
					...operator_lang,
				});
			}
		}
	});
});

[
	'en_US',
	'ja_JP',
	'ko_KR',
].forEach(lang => {
	const lang_extended = `${lang}_extended`;
	OPERATORS_LANG[lang_extended] = [];
	OPERATORS.forEach((operator) => {
		if (operator_i18n[operator.unique_id]) {
			const operator_lang = operator_i18n[operator.unique_id][lang];
			if (operator_lang && operator_lang.enabled) {
				OPERATORS_LANG[lang_extended].push({
					unique_id: operator.unique_id,
					code: operator_i18n[operator.unique_id].code,
					...operator_lang,
				});
			} else {
				const operator_lang_extended = operator_i18n[operator.unique_id].zh_CN;
				OPERATORS_LANG[lang_extended].push({
					unique_id: operator.unique_id,
					code_name: operator_i18n[operator.unique_id].code_name,
					...operator_lang_extended,
				});
			}
		}
	});
});

const options = {
	shouldSort: true,
	threshold: 0.6,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: [{
		name: 'name',
		weight: 0.7,
	}, {
		name: 'code',
		weight: 0.3,
	}],
};

const extended_options = {
	...options,
	keys: [{
		name: 'name',
		weight: 0.7,
	}, {
		name: 'code_name',
		weight: 0.3,
	}],
};

const fuse_i18n = {
	zh_CN: new Fuse(OPERATORS_LANG.zh_CN, {
		...options,
		keys: [{
			name: 'name',
			weight: 0.7,
		}, {
			name: 'alias',
			weight: 0.3,
		}],
	}),
	en_US: new Fuse(OPERATORS_LANG.en_US, options),
	ja_JP: new Fuse(OPERATORS_LANG.ja_JP, options),
	ko_KR: new Fuse(OPERATORS_LANG.ko_KR, options),
	en_US_extended: new Fuse(OPERATORS_LANG.en_US_extended, extended_options),
	ja_JP_extended: new Fuse(OPERATORS_LANG.ja_JP_extended, extended_options),
	ko_KR_extended: new Fuse(OPERATORS_LANG.ko_KR_extended, extended_options),
};

export const search = (query, lang) => {
	const results = (fuse_i18n[lang] || fuse_i18n.zh_CN).search(query);
	if (results.length) {
		const exact_match = results.find(({ name, code, alias }) => name === query || code === query || alias.includes(query));
		if (exact_match) {
			return {
				unique_id: exact_match.unique_id,
				name: exact_match.name,
			};
		}

		const [{ unique_id, name }] = results;
		return { unique_id, name };
	}
	return null;
};

const ArkFuseInputCell = (props) => (
	<div
		class={
			cn(
				style.cell,
				style[props.header_level],
				{
					[style.header]: props.header,
					[style.selected]: props.selected,
				},
				{
					[props.custom_class]: props.custom_class,
				}
			)
		}
	>
		<input
			ref={props.inputRef}
			type="text"
			value={props.content || props.value}
			onChange={e => {
				const query = e.target.value;
				const match = search(query, props.locale || 'zh_CN');
				if (match) {
					props.onChange && props.onChange(match);
				}
			}}
			onClick={e => {
				props.onClick && props.onClick(e);
			}}
		/>
	</div>
);

export default ArkFuseInputCell;
