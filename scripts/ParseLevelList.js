const { stages } = require('./excels/stage_table.json');

const MapItem = require('./mapping.json');
const MapOcc = {
	0: '固定',
	1: '大概率',
	2: '中概率',
	3: '小概率',
	4: '罕见',
};

const ParseLevel = (data) => {
	const level = {
		level: data.code,
		energy: data.apCost,
		unique_id: data.stageId,
		zone_id: data.zoneId,
		normal_drop: [],
		special_drop: [],
		extra_drop: [],
	};

	data.stageDropInfo.displayDetailRewards.forEach(({
		occPercent,
		id,
		dropType,
	}) => {
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

const LEVEL_LIST = [];

Object.entries(stages).forEach(([level_key, level_data]) => {
	LEVEL_LIST.push(ParseLevel(level_data));
});

require('fs').writeFileSync(require('path').resolve(__dirname, '../src/models', 'levels.json'), JSON.stringify(LEVEL_LIST, null, 2));