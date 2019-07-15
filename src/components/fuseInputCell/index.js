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
	keys: [{
		name: 'name',
		weight: 0.3,
	}, {
		name: 'pinyin',
		weight: 0.7,
	}],
};
export const fuse = new Fuse(OPERATORS, options);

const ArkFuseInputCell = (props) => (
	<div
		class={
			cn(
				style.cell,
				style[props.header_level],
				{
					[style.header]: props.header,
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
				const results = fuse.search(e.target.value);
				if (results.length) {
					const [{ name }] = results;
					props.onChange && props.onChange(name);
				} else {
					console.log(results);
					props.onChange && props.onChange(null);
				}
			}}
			onClick={e => {
				props.onClick && props.onClick(e);
			}}
		/>
	</div>
);

export default ArkFuseInputCell;
