import React from 'preact';
import { useRef, useEffect } from 'preact/hooks';

import style from '../../style';

import ArkRow from '../../../../components/row';
import ArkUpgradeInputRow from '../../components/UpgradeInputRow';
import ArkNewUpgradeRow from '../../components/NewUpgradeRow';
import ArkSummaryRow from '../../components/SummaryRow';

let debounce = -1;

const ArkUpgradeRowHeaders = ({
	ir,
	config,
	records,
	addLastRow,
	addEmptyRow,
	updateRow,
	removeRow,
	completeRow,
	fulfillment_statuses,
	summary,
	toggleHiddenAll,
	sortRecords,
	header_list,
	header_skip,
	resources_filter,
}) => {
	const headerRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (debounce) {
				clearTimeout(debounce);
			}

			debounce = setTimeout(() => {
				if (headerRef && headerRef.current) {
					const should_hide = window.scrollX <= 400;
					headerRef.current.style.opacity = should_hide ? 0 : 1;
					headerRef.current.style.pointerEvents = should_hide ? 'none' : 'initial';
					headerRef.current.style.transform = `translateX(${window.scrollX}px)`;
				}
			}, 100);
		};
		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [config.table_row_header]);

	return (
		<div
			class={style.row_header}
			ref={headerRef}
		>
			<ArkRow
				cells={
					[
						{ content: '', halfwidth: true },
						{ content: '', halfwidth: true },
						{ content: '', halfwidth: true },
						{ content: '', halfwidth: true },
						{ content: '', force_no_shrink: true },
						{ content: '', force_no_shrink: true },
						{ content: '' },
						{ content: ir('table-row-stock', 'In stock') },
					]
				}
			/>
			<ArkRow
				cells={
					[
						{ content: '', halfwidth: true },
						{ content: '', halfwidth: true },
						{ content: '', halfwidth: true },
						{ content: '', halfwidth: true },
						{ content: '', force_no_shrink: true },
						{ content: '', force_no_shrink: true },
						{ content: '' },
						{ content: ir('table-row-shortage', 'Shortage') },
					]
				}
			/>
			<ArkSummaryRow
				ir={ir}
				summary={summary}
				toggleHiddenAll={toggleHiddenAll}
				sortRecords={sortRecords}
				header_list={header_list}
				header_skip={header_skip}
				resources_filter={i => i < header_skip}
			/>
			{
				records.map((record, index) => (
					<ArkUpgradeInputRow
						ir={ir}
						showExtendedData={config.showExtendedData}
						key={`${record.operator_id}_${record.attribute}_${record.current}_${record.target}_${record.hidden}_${record.selected}_${index}`}
						record={record}
						record_index={index}
						update={updateRow}
						remove={removeRow}
						complete={completeRow}
						fulfillment_status={fulfillment_statuses[index]}
						header_list={header_list}
						header_skip={header_skip}
						resources_filter={i => i < header_skip}
					/>
				))
			}

			<ArkNewUpgradeRow
				addEmptyRow={addEmptyRow}
				addLastRow={addLastRow}
			/>
		</div>
	);
};

export default ArkUpgradeRowHeaders;