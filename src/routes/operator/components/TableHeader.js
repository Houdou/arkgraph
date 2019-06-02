import React from 'preact';
import ArkRow from '../../../components/row';

const ArkTableHeader = ({
	config,
	skill_names,
}) => (
	<ArkRow
		cells={
			[
				{ content: '', header_level: 'T0' },
				{ content: '等级', header_level: 'T1' },
				{ content: '精英阶段', header_level: 'T1' },
				{ content: '技能等级', header_level: 'T1' },
				...(skill_names || [null, null, null]).splice(0, 3).map((skill_name, index) => ({
					content: skill_name === null ? `技能${index + 1}专精` : `${skill_name}专精`,
					header_level: 'T1',
					long_text: skill_name && skill_name.length > 4,
				})),
			]
		}
		disable_hover
	/>
);

export default ArkTableHeader;
