import React from 'preact';
import ArkRow from '../../../components/row';

const ArkTableHeader = ({
	ir,
	config,
	operator,
	skill_names,
}) => (
	<ArkRow
		cells={
			[
				{ content: '', header_level: 'T0' },
				{ content: ir('attribute-elite_rank', 'Elite rank'), header_level: 'T1' },
				{ content: ir('attribute-operator_level', 'Level'), header_level: 'T1' },
				{ content: ir('attribute-skill_level', 'Skill lv.'), header_level: 'T1' },
				...Array(3).fill(null).map((_, index) => ({
					content: skill_names[index]
						? `${skill_names[index]}`
						: `${
							ir('attribute-skill_mastering_prefix', 'Skill ')
						}${index + 1}${
							ir('attribute-skill_mastering_suffix', ' Mastering')
						}` ,
					header_level: 'T1',
					long_text: skill_names[index] && skill_names[index].length > 5
						|| ir('attribute-skill_mastering_prefix', 'Skill ').length > 5,
				})).filter((e, i) => skill_names.length === 0 || i < skill_names.length),
			]
		}
		disable_hover
	/>
);

export default ArkTableHeader;
