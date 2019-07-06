const { RESOURCES } = require('../common/resources');
const stages = require('./penguin_levels.json');

const MapItem = require('../common/mapping.json');

const level_energy = {
	'0-1': 6,
	'0-2': 6,
	'0-3': 6,
	'0-4': 6,
	'0-5': 6,
	'0-6': 6,
	'0-7': 6,
	'0-8': 6,
	'0-9': 6,
	'0-10': 6,
	'0-11': 6,
	'1-1': 6,
	'1-2': 0,
	'1-3': 6,
	'1-4': 6,
	'1-5': 6,
	'1-6': 6,
	'1-7': 6,
	'1-8': 9,
	'1-9': 9,
	'1-10': 9,
	'1-11': 0,
	'1-12': 9,
	'2-1': 9,
	'S2-1': 9,
	'2-2': 9,
	'S2-2': 9,
	'S2-3': 9,
	'S2-4': 9,
	'2-3': 12,
	'2-4': 12,
	'S2-5': 12,
	'S2-6': 12,
	'S2-7': 12,
	'2-5': 12,
	'2-6': 12,
	'2-7': 12,
	'S2-8': 12,
	'S2-9': 12,
	'2-8': 12,
	'2-9': 12,
	'S2-10': 12,
	'S2-11': 12,
	'S2-12': 15,
	'2-10': 15,
	'3-1': 15,
	'3-2': 15,
	'3-3': 15,
	'S3-1': 15,
	'S3-2': 15,
	'3-4': 15,
	'3-5': 15,
	'3-6': 15,
	'3-7': 15,
	'S3-3': 15,
	'S3-4': 15,
	'S3-5': 15,
	'3-8': 18,
	'4-1': 18,
	'4-2': 18,
	'4-3': 18,
	'S4-1': 18,
	'S4-2': 18,
	'S4-3': 18,
	'4-4': 18,
	'4-5': 18,
	'4-6': 18,
	'S4-4': 18,
	'S4-5': 18,
	'S4-6': 18,
	'4-7': 18,
	'4-8': 21,
	'4-9': 21,
	'S4-7': 18,
	'S4-8': 18,
	'S4-9': 21,
	'4-10': 21,
	'LS-1': 10,
	'LS-2': 15,
	'LS-3': 20,
	'LS-4': 25,
	'LS-5': 30,
	'AP-1': 10,
	'AP-2': 15,
	'AP-3': 20,
	'AP-4': 25,
	'AP-5': 30,
	'CA-1': 10,
	'CA-2': 15,
	'CA-3': 20,
	'CA-4': 25,
	'CA-5': 30,
	'CE-1': 10,
	'CE-2': 15,
	'CE-3': 20,
	'CE-4': 25,
	'CE-5': 30,
	'SK-1': 10,
	'SK-2': 15,
	'SK-3': 20,
	'SK-4': 25,
	'SK-5': 30,
	'PR-A-1': 18,
	'PR-B-1': 18,
	'PR-C-1': 18,
	'PR-D-1': 18,
	'PR-A-2': 36,
	'PR-B-2': 36,
	'PR-C-2': 36,
	'PR-D-2': 36,
};

const levels = Object.entries(level_energy)
	.map(([level, energy]) => ({
		level,
		energy,
		normal_drop: [],
		special_drop: [],
		extra_drop: [],
	}));

const mapExtraDrop = (material) => {
	const resource = Object.entries(RESOURCES).find(([k, v]) => v.id === material);
	if (resource) {
		return ({
			resource: resource[1].id,
			probability: '小概率',
		});
	}
};

const parseJson = (record) => {
	const {
		extraDrop,
		code,
		stageId,
	} = record;

	const level = levels.find(l => l.level === code);
	if (!level) {
		console.log(code);
		if (code.startsWith('GT')) return;
	}
	console.log(extraDrop);
	level.extra_drop = extraDrop.map(item => mapExtraDrop(MapItem[item])).filter(Boolean);
	level.unique_id = stageId;
	console.log(level);
};

stages.forEach(parseJson);

const parseProbability = (probability) => {
	const matching = /^(.+)\[([\d~]+)\]$/.exec(probability);
	if (matching) {
		const [, prob, quantity] = matching;
		return {
			probability: prob,
			quantity,
		};
	}
	return { probability };
};
const sumSource = (material) => {
	Object.entries(material.source).forEach(([level, probability]) => {
		if (probability.startsWith('罕见')){
			levels.find(l => l.level === level).special_drop.push({
				resource: material.id,
				...parseProbability(probability),
			});
		} else {
			levels.find(l => l.level === level).normal_drop.push({
				resource: material.id,
				...parseProbability(probability),
			});
		}
	});
};

Object.entries(RESOURCES).forEach(([k, v]) => {
	sumSource(v);
});


require('fs').writeFileSync(
	require('path').resolve(__dirname, '../../src/models/levels.json'),
	JSON.stringify(
		levels,
		null,
		2
	)
);
