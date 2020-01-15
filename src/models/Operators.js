import operators from './operators.json';
import operator_i18n from '../i18n/operators.json';
import { locale as available_locale } from '../i18n/locale';

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

const getOperatorName = ({ id, locale, fallback }) => {
	const operator = operator_i18n[id];
	if (operator) {
		const locale_operator = operator[locale];
		if (locale_operator && locale_operator.enabled) {
			const name = locale_operator.name;
			return name;
		}
	}
	return fallback;
};

const getSkillNames = ({ id, locale }) => {
	const operator = operator_i18n[id];
	if (operator) {
		const locale_operator = operator[locale];
		if (locale_operator && locale_operator.enabled) {
			const skills = locale_operator.skills;
			return skills;
		}
	}
	return [];
};

export {
	OPERATORS,
	getOperatorName,
	getSkillNames,
	findOperatorByName,
};
