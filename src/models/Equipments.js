import equipment_i18n from '../i18n/equipments.json';
import { locale as available_locale } from '../i18n/locale';

const LANG = Object.keys(available_locale);

export default class Equipment {
	constructor({ equipment_id }) {
		this.equipment_id = equipment_id;
	}
}

const findEquipmentByName = (name) => {
	for (const equipment of Object.entries(equipment_i18n)) {
		const candidate = Object.entries(equipment[1])
			.filter(([lang]) => LANG.includes(lang))
			.find(([lang, equipment_lang]) => equipment_lang && equipment_lang.enabled && equipment_lang.name === name);
		if (candidate) {
			return {
				locale: candidate[0],
				unique_id: equipment[0],
			};
		}
	}
};

const getEquipmentName = ({ id, locale, fallback, showExtendedData = false }) => {
	const equipment = equipment_i18n[id];

	if (equipment) {
		const locale_equipment = equipment[locale];
		if (locale_equipment && locale_equipment.enabled) {
			const name = locale_equipment.name;
			return name;
		}
		if (showExtendedData) {
			const extended_name = equipment.code_name;
			return extended_name;
		}
	}
	return fallback;
};

export {
	getEquipmentName,
	findEquipmentByName,
};
