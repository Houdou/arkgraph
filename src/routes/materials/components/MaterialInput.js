import React from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Fuse from 'fuse.js';
import style from '../style';

import { MONEY, EXP_TAPES, MATERIALS, SKILL_BOOKS, CHIPS } from '../../../models/Resources';

const materials = [
	...MATERIALS,
	...SKILL_BOOKS,
	...CHIPS,
	...EXP_TAPES,
	MONEY,
];

const options = {
	shouldSort: true,
	threshold: 0.8,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: [
		'name',
		'pinyin',
		'id',
		'source',
	]
};

const fuse = new Fuse(materials, options);

const ArkMaterialInput = ({
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
					const results = fuse.search(e.target.value);
					if (results.length > 0) {
						const [query] = results;
						setMaterialQuery(query.id);
					} else {
						console.log(results);
					}
				}}
				onClick={() => material_input_ref.current && material_input_ref.current.select()}
			/>
		</div>
	);
};

export default ArkMaterialInput;
