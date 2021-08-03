import operators from './operators.json';
import operator_i18n from '../i18n/operators.json';
import { locale as available_locale } from '../i18n/locale';

import { getEquipmentName } from './Equipments';

const LANG = Object.keys(available_locale);

const OPERATORS = operators.map(o => o);

export default class Operator {
	constructor(name, attributes) {
		this.name = name;
		this.attributes = attributes;
	}
}

const findOperatorByName = (name) => {
	for (const operator of Object.entries(operator_i18n)) {
		const candidate = Object.entries(operator[1])
			.filter(([lang]) => LANG.includes(lang))
			.find(([lang, operator_lang]) => operator_lang && operator_lang.enabled && operator_lang.name === name);
		if (candidate) {
			return {
				locale: candidate[0],
				unique_id: operator[0],
			};
		}
	}
};

const getOperatorName = ({ id, locale, fallback, showExtendedData = false }) => {
	const operator = operator_i18n[id];
	if (operator) {
		const locale_operator = operator[locale];
		if (locale_operator && locale_operator.enabled) {
			const name = locale_operator.name;
			return name;
		}
		if (showExtendedData) {
			const extended_name = operator.code_name;
			return extended_name;
		}
	}
	return fallback;
};

const getSkillNames = ({ id, locale, showExtendedData = false }) => {
	const operator = operator_i18n[id];
	if (operator) {
		const locale_operator = operator[locale];
		if (locale_operator && locale_operator.enabled) {
			const skills = locale_operator.skills;
			return skills;
		}
		if (showExtendedData) {
			const extended_data = operator.zh_CN;
			if (extended_data) {
				const extended_skills = extended_data.skills;
				return extended_skills;
			}
		}
	}
	return [];
};

const getEquipmentNames = ({ id, locale, showExtendedData = false }) => {
	const operator = operators.find(({ unique_id }) => unique_id === id);

	if (operator) {
		return operator.equipments.map(({
			equipment_id,
		}) => getEquipmentName({ id: equipment_id, locale, showExtendedData }));
	}
	return [];
};

export {
	OPERATORS,
	getOperatorName,
	getSkillNames,
	getEquipmentNames,
	findOperatorByName,
};
