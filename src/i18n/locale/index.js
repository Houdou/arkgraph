import template from './template';
import zhCN from './zh_CN';
import enUs from './en_US';
import jaJP from './ja_JP';
import koKR from './ko_KR';

export default {
	template,
	zh_CN: zhCN,
	zh_TW: zhCN,
	en_US: enUs,
	ja_JP: jaJP,
	ko_KR: koKR,
};

const locale = {
	zh_CN: '中文',
	zh_TW: '繁體中文',
	en_US: 'English',
	ja_JP: '日本語 [β]',
	ko_KR: '한국어 [β]',
};

export {
	locale,
};