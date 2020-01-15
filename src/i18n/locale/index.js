import template from './template';
import zhCN from './zh_CN';
import enUs from './en_US';
import jaJP from './ja_JP';

export default {
	template,
	zh_CN: zhCN,
	en_US: enUs,
	ja_JP: jaJP,
	ko_KR: enUs,
};

const locale = {
	zh_CN: '中文',
	en_US: 'English',
	ja_JP: '日本語 [β]',
	ko_KR: '한국어 [Incomplete]',
};

export {
	locale,
};