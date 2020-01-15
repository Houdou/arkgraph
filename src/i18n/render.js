import LOCALE from './locale';

const LocaleRender = locale => {
	const renderer = (id, fallback = '-') => LOCALE[locale] && LOCALE[locale][id] || fallback;
	renderer.locale = locale;
	return renderer;
};

export default LocaleRender;
