const pinyin = require('pinyin');
const characters = require('./excels/character_table.json');
const patch_characters = require('./excels/char_patch_table.json');
const skills = require('./excels/skill_table.json');
const MapItem = require('./mapping.json');
const game_data = require('./excels/gamedata_const.json');

const all_characters = [
	...Object.entries(characters),
	...Object.entries(patch_characters.patchChars).map(
		([unique_id, char]) => {
			switch (unique_id) {
				case 'char_1001_amiya2': {
					return [unique_id, {
						...char,
						name: `升变${char.name}`,
					}];
				}
			}
		}
	),
];

const parseCharacter = (character, unique_id) => {
	if (
		character.rarity < 2 ||
    character.profession === 'TOKEN'
	) {
		return null;
	}

	console.log(character.name);

	const operator_pinyin = [].concat(...pinyin(character.name, {
		style: pinyin.STYLE_NORMAL,
	}));
	const operator = {
		unique_id,
		name: character.name,
		pinyin: [
			operator_pinyin.join(' '),
			operator_pinyin.join(''),
		],
		profession: character.profession,
		rarity: character.rarity,
	};

	const master_skills = character.skills.map(skill_data => {
		const skill = Object.values(skills).find(({ skillId }) => skill_data.skillId === skillId);

		const upgrades = skill_data.levelUpCostCond.map((master_skill, index) => ({
			level: index,
			materials: master_skill.levelUpCost ? master_skill.levelUpCost.map(requirement => ({
				resource: MapItem[requirement.id],
				quantity: requirement.count,
			})) : [],
		}));

		return {
			name: skill.levels[0].name,
			upgrades,
		};
	});
	operator.skill_names = master_skills.map(({ name }) => name);
	operator.skills = character.allSkillLvlup.map(({ lvlUpCost }, index) => ({
		level: index + 1,
		materials: lvlUpCost ? lvlUpCost.map(requirement => ({
			resource: MapItem[requirement.id],
			quantity: requirement.count,
		})) : [],
	}));
	operator.master_skills = master_skills;
	operator.elites = character.phases.map(({ evolveCost }, index) => index && ({
		rank: index,
		materials: evolveCost && [
			{
				id: '4001',
				count: game_data.evolveGoldCost[character.rarity][index - 1],
			},
			...evolveCost,
		].map(requirement => ({
			resource: MapItem[requirement.id],
			quantity: requirement.count,
		})),
	})).splice(1);
	operator.meta = {
		max_elite_rank: operator.elites.length,
		max_master_skills: operator.master_skills.length,
	};

	console.log(operator);
	return operator;
};

const OPERATORS = all_characters
	.sort((a, b) => b[1].rarity - a[1].rarity)
	.map(([id, value], index) => parseCharacter(value, id))
	.filter(Boolean);

require('fs').writeFileSync(require('path').resolve(__dirname, '../src/models', 'operators.json'), JSON.stringify(OPERATORS, null, 2));
