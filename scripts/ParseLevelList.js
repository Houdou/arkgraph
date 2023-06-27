const { stages } = require('./excels/stage_table.json');
const { stageList: retro_stages } = require('./excels/retro_table.json');

const MapItem = require('./mapping.json');
const MapOcc = {
	0: '固定',
	1: '大概率',
	2: '中概率',
	3: '小概率',
	4: '罕见',
};

const DROP_TYPES = {
	"NONE": 0,
	"ONCE": 1,
	"NORMAL": 2,
	"SPECIAL": 3,
	"ADDITIONAL": 4,
	"APRETURN": 5,
	"DIAMOND_MATERIAL": 6,
	"FUNITURE_DROP": 7,
	"COMPLETE": 8,
	"CHARM_DROP": 9,
	"OVERRIDE_DROP": 10,
	"ITEM_RETURN": 11,
}

const MapDropType = dropType => {
	if (Object.keys(DROP_TYPES).includes(dropType)) return DROP_TYPES[dropType];
	return dropType;
}

const ParseLevel = (data) => {
	const retro_data = retro_stages[data.stageId];
	const is_perm = Boolean(retro_data);

	const level_data = is_perm ? retro_data : data;

	const level = {
		level: data.code,
		energy: level_data.apCost,
		unique_id: data.stageId,
		zone_id: data.zoneId,
		is_perm,
		normal_drop: [],
		special_drop: [],
		extra_drop: [],
	};

	level_data.stageDropInfo.displayDetailRewards.forEach(({
		occPercent,
		id,
		dropType: dropTypeRaw,
	}) => {
		const dropType = MapDropType(dropTypeRaw)

		if (!MapItem[id]) { // Not supported
			return;
		}
		if (
			!MapItem[id].startsWith('M')
			&& !MapItem[id].startsWith('E')
			&& !MapItem[id].startsWith('S')
			&& !MapItem[id].startsWith('C')
			&& !MapItem[id].startsWith('O')
			&& !MapItem[id].startsWith('PC')
		) {
			return;
		}
		const item = {
			resource: MapItem[id],
			probability: MapOcc[occPercent],
		};
		switch (dropType) {
			case 2: // Normal
				level.normal_drop.push(item);
				break;
			case 3: // Special
				level.special_drop.push(item);
				break;
			case 4: // Extra
				level.extra_drop.push({
					...item,
					probability: MapOcc[3],
				});
				break;
			default:
			case 8: // First time
				break;

		}
	});

	return level;
};

const level_list = [];

Object.entries(stages).forEach(([level_key, level_data]) => {
	const level = ParseLevel(level_data);

	if (!level) {
		return;
	}

	if (level.normal_drop.length + level.special_drop.length + level.extra_drop.length === 0) {
		return;
	}

	level_list.push(level)
});

const sorted_level_list = level_list.sort(
	(a, b) => b.normal_drop.length - a.normal_drop.length
);

require('fs').writeFileSync(require('path').resolve(__dirname, '../src/models', 'levels.json'), JSON.stringify(sorted_level_list, null, 2));