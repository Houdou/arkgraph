const fs = require('fs');
const path = require('path');
const prev_operators = require('./diff/operators.json');
const new_operators = require('../../src/i18n/operators.json');

const OPERATORS = require('../../src/models/operators.json');

const I18N_LANG = [
	'zh_TW',
	'en_US',
	'ja_JP',
	'ko_KR',
];

const now = new Date();
const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

const cn_prev_operators_list = Object.keys(prev_operators);
const cn_new_operator_list = Object.keys(new_operators);

const added_operators = cn_new_operator_list.filter(unique_id => !cn_prev_operators_list.includes(unique_id)).filter(unique_id => unique_id.startsWith('char_'));
const i18n_added_oprators = Object.entries(new_operators).map(([unique_id, value]) => {
	if (!unique_id.startsWith('char_')) {
		return null;
	}

	const prev_status = prev_operators[unique_id];
	if (!prev_status) {
		return null;
	}

	const new_status = value;

	const added_locale = I18N_LANG.filter(locale => !prev_status[locale] && new_status[locale]);

	if (added_locale.length <= 0) {
		return null;
	}

	return {
		locale: added_locale,
		operator: unique_id,
	};
}).filter(Boolean);

// write to announcement
const cn_announcement = added_operators.length > 0 && {
	server: [
		'zh_CN',
	],
	date,
	type: 'new_operators',
	new_operators: added_operators,
};

const i18n_announcements = i18n_added_oprators.map(item => ({
	server: item.locale,
	date,
	type: 'new_operators',
	new_operators: [item.operator],
}));

const current_announcement_items = require('../../src/routes/info/auto_announcements.json');

const announcement_items = [
	cn_announcement,
	...i18n_announcements,
].filter(Boolean).reduce((acc, next) => {
	const merge_server_index = acc.findIndex(item => (
		item.date === next.date &&
		item.type === next.type &&
    item.server.length === next.server.length &&
    item.server.every(server => next.server.includes(server))
	));
	if (merge_server_index >= 0) {
		const merge_item = acc[merge_server_index];
		return acc.map((item, index) => index === merge_server_index ? {
			...merge_item,
			new_operators: [
				...merge_item.new_operators,
				...next.new_operators,
			],
		} : item);
	}

	const merge_operators_index = acc.findIndex(item => (
		item.date === next.date &&
		item.type === next.type &&
    item.new_operators.length === next.new_operators.length &&
    item.new_operators.every(unique_id => next.new_operators.includes(unique_id))
	));
	if (merge_operators_index >= 0) {
		const merge_item = acc[merge_operators_index];
		return acc.map((item, index) => index === merge_operators_index ? {
			...merge_item,
			server: [
				...merge_item.server,
				...next.server,
			],
		} : item);
	}

	return [next ,...acc];
}, current_announcement_items).map(item => {
	if (item.type === 'new_operators') {
		return {
			...item,
			new_operators: item.new_operators.sort((a, b) => (
				(OPERATORS.find(({ unique_id }) => unique_id === b) || { rarity: 0 }).rarity
				- (OPERATORS.find(({ unique_id }) => unique_id === a) || { rarity: 0 }).rarity
			)),
		};
	}

	return item;
}).sort((a, b) => b.date.localeCompare(a.date)).filter((_, i) => i < 10);

// Update diff file
fs.writeFileSync(path.resolve(__dirname, './diff/operators.json'), JSON.stringify(new_operators, null, 2));

// Update announcements
fs.writeFileSync(path.resolve(__dirname, '../../src/routes/info/auto_announcements.json'), JSON.stringify(announcement_items, null, 2));
