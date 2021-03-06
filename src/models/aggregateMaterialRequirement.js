import { ATTRIBUTES } from './Attributes';
import { OPERATORS, getSkillNames } from './Operators';

import operator_i18n from '../i18n/operators.json';
import { RESOURCES } from './Resources';

const aggregateMaterialRequirement = ({
	locale,
	showExtendedData = false,
}) => {
	const material_requirements = {};

	Object.entries(RESOURCES).forEach(([id, material]) => {
		material_requirements[id] = {};
	});

	Object.entries(RESOURCES).forEach(([id, material]) => {
		const compound_materials = Object.entries(material.formula);
		compound_materials.forEach(([resource, quantity]) => {
			material_requirements[resource].compound = material_requirements[resource].compound || [];
			material_requirements[resource].compound.push({
				result: id,
				required: quantity,
			});
		});
	});

	OPERATORS
		.filter(operator => {
			const operator_lang = operator_i18n[operator.unique_id][locale];
			return showExtendedData || operator_lang && operator_lang.enabled;
		})
		.forEach((operator, index) => {
			operator.skills && operator.skills.forEach((skill, index) => {
				skill.materials.forEach(({ resource, quantity }) => {
					material_requirements[resource].operator = material_requirements[resource].operator || [];
					material_requirements[resource].operator.push({
						operator_id: operator.unique_id,
						profession: operator.profession,
						rarity: operator.rarity,
						attribute: ATTRIBUTES.SKILL_LEVEL,
						current: index + 1,
						target: index + 2,
						quantity,
					});
				});
			});

			operator.elites && operator.elites.forEach((elite, index) => {
				elite.materials && elite.materials.forEach(({ resource, quantity }) => {
					material_requirements[resource].operator = material_requirements[resource].operator || [];
					material_requirements[resource].operator.push({
						operator_id: operator.unique_id,
						profession: operator.profession,
						rarity: operator.rarity,
						attribute: ATTRIBUTES.ELITE_RANK,
						current: index,
						target: index + 1,
						quantity,
					});
				});
			});

			const skill_names = getSkillNames({ id: operator.unique_id, locale, showExtendedData });
			operator.master_skills.forEach((master_skill, skill_index) => {
				master_skill.upgrades.forEach((upgrade, level) => {
					upgrade.materials.forEach(({ resource, quantity }) => {
						material_requirements[resource].operator = material_requirements[resource].operator || [];
						material_requirements[resource].operator.push({
							operator_id: operator.unique_id,
							profession: operator.profession,
							rarity: operator.rarity,
							attribute: ATTRIBUTES[`MASTER_SKILL_${skill_index + 1}`],
							render: skill_names[skill_index],
							current: level,
							target: level + 1,
							quantity,
						});
					});
				});
			});
		});

	material_requirements['G-4-1'] = {
		operator: [],
		compound: [],
	};

	return material_requirements;
};

export default aggregateMaterialRequirement;
