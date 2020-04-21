import React from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Fuse from 'fuse.js';
import style from '../style';

import { LEVELS } from '../../../models/Levels';

const options = {
	shouldSort: true,
	threshold: 0.9,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: [{
		name: 'level',
		weight: 0.8,
	}, {
		name: 'unique_id',
		weight: 0.2,
	}],
};

const fuse = new Fuse(LEVELS, options);

const ArkStockInput = ({
	level_id,
	setLevelId,
}) => {
	const level_id_input_ref = useRef(null);

	useEffect(() => {
		if (!level_id) {
			level_id_input_ref.current && level_id_input_ref.current.focus();
		}
	}, []);

	return (
		<div class={style.level_id_input} >
			<input
				value={level_id}
				type="text"
				ref={level_id_input_ref}
				onChange={e => {
					const results = fuse.search(e.target.value);
					if (results.length > 0) {
						const exact = results.find(
							({ level }) => level.toLowerCase().replace(/-/g, '') === (e.target.value || '').toLowerCase()
						);
						if (exact) {
							setLevelId(exact.level);
							return;
						}

						const [query] = results;
						setLevelId(query.level);
					} else {
						console.log(results);
					}
				}}
				onClick={() => level_id_input_ref.current && level_id_input_ref.current.select()}
			/>
		</div>
	);
};

export default ArkStockInput;
