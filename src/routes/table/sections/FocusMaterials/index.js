import React from 'preact';
import style from './style';

import { RESOURCES } from '../../../../models/Resources';
import ArkMaterialCard from '../../../../components/materialCard';

const ArkFocusMaterials = ({
	materials = ['M-5-1', 'M-4-2', 'M-3-2', 'M-4-7', 'C-4-2'],
	stock,
}) =>
	// const material = RESOURCES[id];
	 (
		<div class={style.wrapper}>
			{
				materials.map(mid => (
					<ArkMaterialCard
						id={mid}
						class={style.card}
						stock={stock}
					/>
				))
			}
		</div>
	)
;

export default ArkFocusMaterials;
