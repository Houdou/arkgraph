const axios = require('axios');
const cheerio = require('cheerio');

const { OPERATORS } = require('./operators');
const wiki_base_url = 'http://wiki.joyme.com/arknights/';

function process_attribute(raw) {
	let matching = raw.trim().match(/【(.+)】(.+)/);
	if (!matching) {
		console.error('?????');
		return null;
	}
	let [, resource, quantity] = matching;

	if (resource === '等级需求') {
		return null;
	}
	quantity = quantity.replace('w', '0000');

	return {
		resource,
		quantity,
	};
}

function process_quantity(raw) {
	let matching = raw.trim().match(/\d+(\D)?.*/);
	if (!matching) {
		console.error('?????');
	}
	let [, match] = matching;
	return raw.trim().split(match).map(Number);
}

const operator_requirements = [];

async function loadWiki(operator) {
	const { data: body } = await axios({
		url: `${wiki_base_url}${encodeURIComponent(operator.name)}`,
		method: 'get',
	});

	const $ = cheerio.load(body);
	console.log(operator.name);

	const elite_materials = {};
	$('.tj-bgs .tj-btl').each(function (i, e) {
		// Locate the block
		if ($(this).text() === '精英化') {
			$(this).parent().children('table').each(function (i, e) {
				// Locate the table
				const elite_level = $('tr', this).first().children('th').first().text().trim();
				elite_materials[elite_level] = [];
				$('tr', this).last().children().each(function (i, e) {
					const requirement_raw = $(this).text().trim();
					if (!requirement_raw.length) {
						return;
					}
					const requirement = process_attribute(requirement_raw);
					if (requirement) {
						elite_materials[elite_level].push(requirement);
					}
				});
			});
		}
	});

	const skill_materials = {};
	$('.tj-bgs .tj-btl').each(function (i, e) {
		// Locate the block
		if ($(this).text() === '技能升级消耗') {
			$(this).parent().children('table').each(function (i, e) {
				// Locate the skill table
				let level_change = null;
				$(this).children().children().each(function (i, e) {
					if (i === 0) return;

					if (i % 2 === 1) {
						level_change = $(this).children('th').text().trim();
						// Resources
						skill_materials[level_change] = [];
						$('td .itemhover > div > a', this).each(function(i, e) {
							skill_materials[level_change].push({ resource: $(this).attr('title'), quantity: 0 });
						});
					}

					if (i % 2 === 0) {
						const quantity_raw = $(this).children('td').text().trim();
						if (!quantity_raw.length) {
							return;
						}
						const quantity = process_quantity(quantity_raw);
						quantity.forEach((q, i) => {
							skill_materials[level_change][i].quantity = q;
						});
					}
				});
			});
		}
	});

	operator_requirements.push({
		...operator,
		materials: {
			elite: elite_materials,
			skill: skill_materials,
		},
	});
}

async function loadAllOperator() {
	for (const operator of OPERATORS) {
		await loadWiki(operator);
	}

	require('fs').writeFileSync(require('path').resolve(__dirname, 'materials.json'),  JSON.stringify(operator_requirements, null, 2), 'utf-8');
}

loadAllOperator();
