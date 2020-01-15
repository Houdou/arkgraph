import locale from '../locale';

const {
	template,
	...translations
} = locale;

describe('i18n locale render', () => {
	it('all locale should cover all the keys in template', () => {
		const keys = Object.keys(template);
		const check = Object.entries(translations)
			.every(([language, translation]) => {
				const failed_key = keys.find(locale_key => !translation.hasOwnProperty(locale_key));
				if (failed_key) {
					console.error(`key '${failed_key}' is missing in language '${language}'`);
					return false;
				}
				return true;
			});
		expect(check).toBe(true);
	});
});
