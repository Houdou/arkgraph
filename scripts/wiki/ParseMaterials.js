const pinyin = require('pinyin');
const { RESOURCES } = require('./resources');
const operators = require('./materials.json');

const mapMaterial = (material) => ({
	resource: Object.entries(RESOURCES).find(([k, v]) => v.name === material.resource)[1].id,
	quantity: Number(material.quantity),
});

const parseJson = (record) => {
	const operator = {
		name: record.name,
		pinyin: [].concat(...pinyin(record.name, {
			style: pinyin.STYLE_NORMAL,
		})),
	};

	operator.skills = Object.keys(record.materials.skill)
		.filter(name => name.split(' ').length === 1)
		.map((upgrade, level) => ({
			level: level + 1,
			materials: record.materials.skill[upgrade].map(mapMaterial),
		}));
	const master_skills = new Set();
	Object.keys(record.materials.skill)
		.filter(name => name.split(' ').length > 1)
		.forEach(skill_name => master_skills.add(skill_name.split(' ')[0]));
	operator.skill_names = Array.from(master_skills);
	operator.master_skills = Array.from(master_skills).map(skill_name => ({
		name: skill_name,
		upgrades: Object.entries(record.materials.skill)
			.filter(([k, v]) => k.includes(skill_name)).map(([k, v]) => ({
				level: k.split(' ')[1].split('→')[0] - 7,
				materials: v.map(mapMaterial),
			})),
	}));
	operator.elites = Object.entries(record.materials.elite).map(([k,v], i) => ({
		rank: i+1,
		materials: v.map(mapMaterial),
	}));
	operator.meta = {
		max_elite_tier: operator.elites.length,
		max_master_skills: operator.master_skills.length,
	};

	return operator;
};

require('fs').writeFileSync(require('path').resolve(__dirname, 'operators.json'), JSON.stringify(operators.map(parseJson), null, 2));
