import React from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Fuse from 'fuse.js';
import style from '../style';

import { MONEY, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../../models/Resources';
import item_i18n from '../../../i18n/items.json';

const materials = [
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
	...EXP_TAPES,
	MONEY,
];

const RESOURCE_LANG = {};

[
	'zh_CN',
	'en_US',
	'ja_JP',
	'ko_KR',
].forEach(lang => {
	RESOURCE_LANG[lang] = [];
	materials.forEach((material) => {
		if (item_i18n[material.id]) {
			const material_lang = item_i18n[material.id][lang];
			if (material_lang && material_lang.enabled) {
				RESOURCE_LANG[lang].push({
					unique_id: String(material.unique_id),
					id: material.id,
					...material_lang,
				});
			}
		}
	});
});

const options = {
	shouldSort: true,
	threshold: 0.8,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: [
		'name',
		'alias',
		'id',
		'unique_id',
	],
};


const fuse_i18n = {
	zh_CN: new Fuse(RESOURCE_LANG.zh_CN, options),
	en_US: new Fuse(RESOURCE_LANG.en_US, options),
	ja_JP: new Fuse(RESOURCE_LANG.ja_JP, options),
	ko_KR: new Fuse(RESOURCE_LANG.ko_KR, options),
};

export const search = (query, lang) => {
	const results = fuse_i18n[lang].search(query);
	if (results.length) {
		const exact_match = results.find(
			({ name, id, unique_id, alias }) =>
				name === query || id === query || unique_id === query || alias.includes(query)
		);
		if (exact_match) {
			return {
				unique_id: exact_match.unique_id,
				id: exact_match.id,
				name: exact_match.name,
			};
		}

		const [{ unique_id, id, name }] = results;
		return { unique_id, id, name };
	}
	return null;
};

const ArkMaterialInput = ({
	locale,
	material,
	setMaterialQuery,
}) => {
	const material_input_ref = useRef(null);

	useEffect(() => {
		if (!material) {
			material_input_ref.current && material_input_ref.current.focus();
		}
	}, []);

	return (
		<div class={style.material_query_input} >
			<input
				value={material}
				type="text"
				ref={material_input_ref}
				onChange={e => {
					const match = search(e.target.value, locale || 'zh_CN');
					if (match) {
						setMaterialQuery(match.id);
					}
				}}
				onClick={() => material_input_ref.current && material_input_ref.current.select()}
			/>
		</div>
	);
};

export default ArkMaterialInput;
