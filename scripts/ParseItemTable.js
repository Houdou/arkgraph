const { items } = require('./excels/item_table.json');
const { stages } = require('./excels/stage_table.json');

const pinyin = require('pinyin');

const MapItem = require('./mapping.json');
const MapOcc = {
	0: '固定',
	1: '大概率',
	2: '中概率',
	3: '小概率',
	4: '罕见',
};

const DropTypeMapping = {
	ALWAYS: '固定',
	ALMOST: '大概率',
	USUAL: '中概率',
	OFTEN: '小概率',
	SOMETIMES: '罕见',
};

const ParseItem = (data) => {
	const item_id = MapItem[data.itemId];
	if (!item_id || !item_id.startsWith('M')) {
		return null;
	}

	const source = {

	};

	data.stageDropList.forEach(({
		stageId,
		occPer,
	}) => {
		const stage_code = stages[stageId].code;
		if (!stageId.startsWith('main') && !stageId.startsWith('sub') && !stageId.startsWith('easy') && !stageId.startsWith('tough')) {
			return;
		}
		source[stage_code] = DropTypeMapping[occPer];
	});

	const item = {
		id: MapItem[data.itemId],
		source,
		sort_id: data.sortId
	};


	return item;
};

const materials_dict = {};

const MATERIAL_LIST = Object.entries(items)
	.sort(([_, { sortId: sa }], [__, { sortId: sb }]) => sb - sa)
	.map(([item_key, item_data]) => ParseItem(item_data))
	.filter(Boolean)
	.forEach((item) => materials_dict[item.id] = item);

const materials_base = require('./materials_base.json');
const materials_full = materials_base.map(mat => ({
	...mat,
	...materials_dict[mat.id],
})).sort((a, b) => a.sort_id - b.sort_id);

// require('fs').writeFileSync(require('path').resolve(__dirname, '../', 'materials.json'), JSON.stringify(materials_full, null, 2));

const fs = require('fs');
const path = require('path');
fs.writeFileSync(path.resolve(__dirname, '../src/models/Resources', 'materials.json'), JSON.stringify(materials_full, null, 2));
