import React from 'preact';
import style from './style';
import cn from 'classnames';
import Fuse from 'fuse.js';

import { OPERATORS } from '../../models/Operators';

const options = {
	shouldSort: true,
	threshold: 0.6,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: [
		'name',
	],
};
const fuse = new Fuse(OPERATORS, options);

const ArkFuseInputCell = (props) => (
	<div
		class={
			cn(
				style.cell,
				style[props.header_level],
				{
					[style.header]: props.header,
				}
			)
		}
	>
		<input
			type="text"
			value={props.content || props.value}
			onChange={e => {
				const results = fuse.search(e.target.value);
				if (results.length) {
					const [{ name }] = results;
					if (props.onChange) {
						props.onChange(name);
					}
				}
				else {
					console.log(results);
					props.onChange(null);
				}
			}}
		/>
	</div>
);

export default ArkFuseInputCell;
