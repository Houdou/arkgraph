import React from 'preact';
import { useState } from 'preact/hooks';

import ArkRow from '../../../components/row';
import ArkCell from '../../../components/cell';
import ArkButton from '../../../components/button';

const sort_by_name = (order) => (a, b) => a.operator > b.operator ? (order ? 0 : -1) : (order ? -1 : 0);
const sort_by_attribute = (order) => (a, b) => a.attibute > b.attibute ? (order ? 0 : -1) : (order ? -1 : 0);

const ArkSummaryRow = ({
	ir,
	summary,
	toggleHiddenAll,
	sortRecords,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const [hidden_all, setHiddenAll] = useState(true);
	const [sorting_order_name_asc, setSortingOrderNameAsc] = useState(false);
	const [sorting_order_attribute_asc, setSortingOrderAttributeAsc] = useState(false);

	const summary_row = Array.from(header_list)
		.splice(header_skip, header_list.length - header_skip)
		.map(e => ({
			content: summary[e.id] || '',
			mobile_long_text: summary[e.id] > 99999,
		}));


	const AllVisibilityButton = (props) => (
		<ArkCell halfwidth>
			<ArkButton
				onClick={() => {
					setHiddenAll(prev => {
						toggleHiddenAll(hidden_all);
						return !prev;
					});
				}}
			>
				<img src="../../../assets/icons/hidden_all.png" alt="tick" style={{
					height: '20px',
					opacity: hidden_all ? 0.2 : 1,
				}}
				/>
			</ArkButton>
		</ArkCell>
	);

	const SortByNameButton = (props) => (
		<ArkCell force_no_shrink>
			<ArkButton
				onClick={() => {
					setSortingOrderNameAsc((prev) => {
						sortRecords(sort_by_name(sorting_order_name_asc));
						return !prev;
					});
				}}
			>
				<span>排序</span>
			</ArkButton>
		</ArkCell>
	);

	const SortByAttributeButton = (props) => (
		<ArkCell force_no_shrink>
			<ArkButton
				onClick={() => {
					setSortingOrderAttributeAsc((prev) => {
						sortRecords(sort_by_attribute(sorting_order_attribute_asc));
						return !prev;
					});
				}}
			>
				<span>排序</span>
			</ArkButton>
		</ArkCell>
	);

	return (
		<ArkRow
			cells={
				[
					{ content: '', halfwidth: true },
					{ content: '', halfwidth: true },
					// { content: '', halfwidth: true },
					AllVisibilityButton,
					// SortByNameButton,
					// SortByAttributeButton,
					{ content: '', force_no_shrink: true },
					{ content: '', force_no_shrink: true },
					{ content: '' },
					{ content: ir('table-row-summary', 'Summary') },
					...summary_row,
				]
			}
			resources_filter={resources_filter}
		/>
	);
};

export default ArkSummaryRow;
