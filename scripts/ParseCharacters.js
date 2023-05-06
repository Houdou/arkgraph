const pinyin = require('pinyin');
const characters = require('./excels/character_table.json');
const patch_characters = require('./excels/char_patch_table.json');
const { equipDict: unique_equipments } = require('./excels/uniequip_table.json');
const skills = require('./excels/skill_table.json');
const MapItem = require('./mapping.json');
const game_data = require('./excels/gamedata_const.json');

const TIERS = {
	TIER_1: 0,
	TIER_2: 1,
	TIER_3: 2,
	TIER_4: 3,
	TIER_5: 4,
	TIER_6: 5,
};

const mapRarity = rarity => TIERS[rarity] || 0;

const DEPLOY_FLAGS = {
	MELEE: 1 << 0,
	RANGED: 1 << 1,
};

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
].filter(
	// Duplicated rogue characters
	([unique_id]) => unique_id !== 'char_512_aprot' // char_4025_aprot2
);

const parseCharacter = (character, unique_id) => {
	if (
		character.rarity < 2 ||
		character.profession === 'TOKEN'
	) {
		return null;
	}

	const operator_pinyin = [].concat(...pinyin(character.name, {
		style: pinyin.STYLE_NORMAL,
	}));

	const {
		name,
		profession,
		rarity: rarity_enum
	} = character;

	const rarity = String(rarity_enum).startsWith("TIER_") ? mapRarity(rarity_enum) : rarity_enum

	const operator = {
		unique_id,
		name,
		pinyin: [
			operator_pinyin.join(' '),
			operator_pinyin.join(''),
		],
		profession,
		rarity,
		equipments: [],
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
				count: game_data.evolveGoldCost[rarity][index - 1],
			},
			...evolveCost,
		].map(requirement => ({
			resource: MapItem[requirement.id],
			quantity: requirement.count,
		})),
	})).splice(1);
	operator.equipments = Object.entries(unique_equipments)
		.filter(([equipment_id, equipData]) => equipData.charId === unique_id && equipData.itemCost)
		.map(([equipment_id, equipData]) => {
			const {
				itemCost,
			} = equipData;

			return Object.entries(itemCost).map(([equipment_level, equip_level_cost]) => ({
				equipment_id,
				equipment_level,
				materials: equip_level_cost.map(requirement => ({
					resource: MapItem[requirement.id],
					quantity: requirement.count,
				})),
			}));
		});

	operator.meta = {
		max_elite_rank: operator.elites.length,
		max_master_skills: operator.master_skills.length,
		max_equipments: operator.equipments.length,
	};

	return operator;
};

const OPERATORS = all_characters
	.sort((a, b) => mapRarity(b[1].rarity) - mapRarity(a[1].rarity))
	.map(([id, value], index) => parseCharacter(value, id))
	.filter(Boolean);

require('fs').writeFileSync(require('path').resolve(__dirname, '../src/models', 'operators.json'), JSON.stringify(OPERATORS, null, 2));
