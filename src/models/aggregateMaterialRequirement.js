import { ATTRIBUTES } from './Attributes';
import { OPERATORS } from './Operators';
import { RESOURCES } from './Resources';

const aggregateMaterialRequirement = () => {
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

	OPERATORS.forEach((operator, index) => {
		operator.skills.forEach((skill, index) => {
			skill.materials.forEach(({ resource, quantity }) => {
				material_requirements[resource].operator = material_requirements[resource].operator || [];
				material_requirements[resource].operator.push({
					operator: operator.name,
					profession: operator.profession,
					rarity: operator.rarity,
					attribute: ATTRIBUTES.SKILL_LEVEL,
					current: index + 1,
					target: index + 2,
					quantity,
				});
			});
		});

		operator.elites.forEach((elite, index) => {
			elite.materials.forEach(({ resource, quantity }) => {
				material_requirements[resource].operator = material_requirements[resource].operator || [];
				material_requirements[resource].operator.push({
					operator: operator.name,
					profession: operator.profession,
					rarity: operator.rarity,
					attribute: ATTRIBUTES.ELITE_RANK,
					current: index,
					target: index + 1,
					quantity,
				});
			});
		});

		operator.master_skills.forEach((master_skill, skill_index) => {
			master_skill.upgrades.forEach((upgrade, level) => {
				upgrade.materials.forEach(({ resource, quantity }) => {
					material_requirements[resource].operator = material_requirements[resource].operator || [];
					material_requirements[resource].operator.push({
						operator: operator.name,
						profession: operator.profession,
						rarity: operator.rarity,
						attribute: ATTRIBUTES[`MASTER_SKILL_${skill_index + 1}`],
						render: operator.skill_names[skill_index],
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
