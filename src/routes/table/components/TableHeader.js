import React from 'preact';

import ArkRow from '../../../components/row';
import ArkCell from '../../../components/cell';
import ArkItem from '../../../components/item';

import item_i18n from '../../../i18n/items.json';

const getItemName = ({ id, locale, fallback }) => {
	const item = item_i18n[id];
	if (item) {
		const locale_item = item[locale];
		if (locale_item && locale_item.enabled) {
			const name = locale_item.name;
			return name;
		}
	}
	return fallback;
};

const ArkTableHeader = ({
	ir,
	config,
	focus_materials,
	header_list,
	header_skip,
	resources_filter,
	toggleFocusMaterial,
}) => {
	const ArkIconCell = (e) => (props) => (
		<ArkCell
			key={e.id}
			header_level={e.tier}
			is_focus_material={focus_materials.some(({ id }) => id === e.id)}
			onClick={() => toggleFocusMaterial(e.id)}
			header
			{...props}
		>
			<ArkItem id={e.id} tier={e.tier} />
			<span>{getItemName({ id: e.id, locale: config.locale, fallback: e.name })}</span>
		</ArkCell>
	);

	return (
		<ArkRow
			cells={
				[
					{ content: ir('table-header-remove', ''), halfwidth: true, header_level: 'T1' },
					{ content: ir('table-header-finish', ''), halfwidth: true, header_level: 'T1' },
					{ content: ir('table-header-hide', ''), halfwidth: true, header_level: 'T1' },
					{
						content: ir('table-header-operator', 'Operator'),
						header_level: 'T1',
						long_text: ir('table-header-operator', 'Operator').length > 5,
						force_no_shrink: true,
					},
					{ content: ir('table-header-attribute', 'Attribute'), header_level: 'T1', force_no_shrink: true },
					{ content: ir('table-header-current', 'Current'), header_level: 'T1' },
					{ content: ir('table-header-target', 'Target'), header_level: 'T1' },
					...Array.from(header_list)
						.splice(header_skip, header_list.length - header_skip)
						.map(e => ArkIconCell(e)),
				]
			}
			disable_hover
			resources_filter={resources_filter}
			icons_header
			header
		/>
	);
};

export default ArkTableHeader;
