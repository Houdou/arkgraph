import React from 'preact';
import ArkRow from '../../../components/row';

const ArkTableHeader = ({
	config,
	operator,
}) => {
	const skill_names = (operator && operator.skill_names) || [];
	return (
		<ArkRow
			cells={
				[
					{ content: '', header_level: 'T0' },
					{ content: '精英阶段', header_level: 'T1' },
					{ content: '等级', header_level: 'T1' },
					{ content: '技能等级', header_level: 'T1' },
					...Array(3).fill(null).map((_, index) => ({
						content: skill_names[index] ? `${skill_names[index]}` : `技能${index + 1}专精` ,
						header_level: 'T1',
						long_text: skill_names[index] && skill_names[index].length > 5,
					})).filter((e, i) => skill_names.length === 0 || i < skill_names.length),
				]
			}
			disable_hover
		/>
	);
};

export default ArkTableHeader;
