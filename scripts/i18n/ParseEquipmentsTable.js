const path = require('path');

const LANG = [
	'en_US',
	'ja_JP',
	'ko_KR',
	'zh_CN',
	// 'zh_TW',
];

const equipments_data = {};

const readTable = (lang) => {
	try {
		const { equipDict } = require(path.resolve(__dirname, `./data/${lang}/gamedata/excel/uniequip_table.json`));
		Object.entries(equipDict)
			.filter(([key, value]) => value.type !== 'INITIAL')
			.forEach(([
				key, value,
			]) => {
				const {
					uniEquipName,
					charId,
				} = value;

				equipments_data[key] = equipments_data[key] || {};
				equipments_data[key].char_id = charId;

				equipments_data[key][lang] = equipments_data[key][lang] || {};
				equipments_data[key][lang].enabled = true;
				equipments_data[key][lang].name = uniEquipName;
			});
	} catch (err) {

		// Not enabled for non CN server
	}

};

LANG.forEach(lang => {
	readTable(lang);
});

require('fs').writeFileSync(require('path').resolve(__dirname, '../../src/i18n', 'equipments.json'), JSON.stringify(equipments_data, null, 2));
