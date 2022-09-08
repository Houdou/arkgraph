import React, { Fragment } from 'preact';
import cn from 'classnames';
import { useState, useEffect, useRef } from 'preact/hooks';
import style from './style';

import { STORAGE_KEY as SAVE_STORAGE_KEY } from '../../models/useData';
import { STORAGE_KEY as CONFIG_STORAGE_KEY } from '../../config/useConfig';
const LANG_PREF = 'Towa_ArkTable_Lang';

import Upgrade from '../../models/Upgrade';
import sumRequirements from '../../models/sumRequirements';
import generateArkPlannerData from '../../services/arkplanner/generatePayload';
import parseArkPlannerData from '../../services/arkplanner/parse';

const ArkSettings = ({
	ir,
	state,
	load,
	config,
	toggleShowExtendedData,
	available_locale,
	setLanguage,
	setStockBulk,
}) => {
	const code_ref = useRef(null);
	const [copy_state, setCopyState] = useState(ir('settings-copy_data-copy', 'Copy'));
	const [load_state, setLoadState] = useState(ir('settings-load_data-load', 'Load'));
	const [load_error, setLoadError] = useState(null);

	const ark_planner_data_ref = useRef(null);
	const [copy_ark_planner_data_state, setCopyArkPlannerDataState] = useState(ir('settings-copy_data-copy', 'Copy'));
	const [load_ark_planner_data_state, setLoadArkPlannerDataState] = useState(ir('settings-load_data-load', 'Load'));

	useEffect(() => {
		load();
	}, []);

	const copyData = (e) => {
		code_ref.current && code_ref.current.select();
		try {
			document.execCommand('copy');
			setCopyState(ir('settings-copy_data-copied', 'Copied'));
		} catch (err) {
			console.error(err);
			setCopyState(ir('settings-copy_data-failed', 'Failed'));
		}
	};

	const copyArkPlannerData = (e) => {
		ark_planner_data_ref.current && ark_planner_data_ref.current.select();
		try {
			try {
				global.ga('send', {
					hitType: 'event',
					eventCategory: 'planner',
					eventAction: 'export',
				});
			} catch (err) { }

			document.execCommand('copy');
			setCopyArkPlannerDataState(ir('settings-copy_data-copied', 'Copied'));
		} catch (err) {
			console.error(err);
			setCopyArkPlannerDataState(ir('settings-copy_data-failed', 'Failed'));
		}
	};

	const loadData = (e) => {
		if (code_ref.current) {
			let input_value = code_ref.current.value;
			try {
				load(code_ref.current.value);
				setLoadState(ir('settings-load_data-success', 'Success'));
			} catch (err) {
				code_ref.current.value = input_value;
				console.error(err);
				setLoadError(err.details);
				setLoadState(ir('settings-load_data-failed', 'Failed'));
			}
			setTimeout(() => setLoadState(ir('settings-load_data-load', 'Load')), 1000);
		}
	};
	const loadArkPlannerData = (e) => {
		if (ark_planner_data_ref.current) {
			let input_value = ark_planner_data_ref.current.value;
			try {
				const result = parseArkPlannerData(ark_planner_data_ref.current.value);
				const new_stock = {
					...state.stock,
					...result
				};
				setStockBulk(new_stock);
				setLoadArkPlannerDataState(ir('settings-load_data-success', 'Success'));
			} catch (err) {
				ark_planner_data_ref.current.value = input_value;
				console.error(err);
				setLoadError(err.details);
				setLoadArkPlannerDataState(ir('settings-load_data-failed', 'Failed'));
			}
			setTimeout(() => setLoadArkPlannerDataState(ir('settings-load_data-load', 'Load')), 1000);
		}
	};

	const summary = sumRequirements(state.records, state.stock, []);
	const ark_planner_data = generateArkPlannerData(summary, state.stock);

	return (
		<div class={style.wrapper}>
			<div class={style.info}>
				<h1><a href="https://ark-nights.com/">ARK-NIGHTS.com</a></h1>
				<hr />
				<h2>{ir('settings-language-language', 'Language')}</h2>
				<div class={style.lang_options}>
					{
						Object.entries(available_locale).map(([key, value]) => ({
							lang: key,
							name: value,
						})).map(({
							lang,
							name,
						}) => (
							<div
								class={cn(
									style.lang_option,
									{
										[style.lang_option_active]: config.locale === lang,
									}
								)}
								onClick={() => {
									setLanguage(lang);
								}}
							>
								{name}
							</div>
						))
					}
				</div>
				<hr />
				<h2>{ir('settings-backup-backup', 'Data Backup')}</h2>
				<div class={style.data_area}>
					<textarea
						ref={code_ref}
						class={style.save_data}
						name="save"
						id=""
						cols="auto" rows="auto"
						value={JSON.stringify({
							...state,
							records: state.records.map(record => new Upgrade(record)),
						})}
					/>
					<div class={style.buttons}>
						<span onClick={e => copyData(e)}>{copy_state}</span>
						<span onClick={e => loadData(e)}>{load_state}</span>
					</div>
				</div>
				{
					load_error && (
						<div class={style.load_error}>{load_error}</div>
					)
				}
				<div
					class={style.clear_data}
					onDblClick={e => {
						e.preventDefault();
						window.localStorage.setItem(LANG_PREF, config.locale);
						window.localStorage.removeItem(CONFIG_STORAGE_KEY);
						window.localStorage.removeItem(SAVE_STORAGE_KEY);
						window.location.reload();
					}}
				>{ir('settings-backup-clear_data', 'Double click to RESET ALL DATA')}</div>
				<hr style={{ 'margin-top': '24px' }} />
				{
					config.locale !== 'zh_CN' && (
						<Fragment>
							<h2>{ir('settings-extended_data-extended_data', 'Extended Data (Unstable)')}</h2>
							{['zh_TW', 'en_US', 'ko_KR'].includes(config.locale) && (
								<p>
									Enable if you need to view ALL operators currently available in CN server. <br />
									Use operator's codename to search.
								</p>
							)}
							{config.locale === 'ja_JP' && (
								<p>
									リリースされていないオペレーターのデータを開放したいなら、このスイッチをオンにください<br />
									オペレーターのコードネームで検索可能が、公式名前がありませんので、コードネームで表示します
								</p>
							)}
							<div class={style.lang_options}>
								<div
									class={cn(
										style.lang_option,
										{
											[style.lang_option_active]: config.showExtendedData,
										}
									)}
									onClick={() => {
										toggleShowExtendedData(!config.showExtendedData);
									}}
								>
									{ir('settings-extended_data-show', 'Show Extended Data')}
								</div>
							</div>
							<hr />
						</Fragment>
					)
				}
				<h2>{
					ir('settings-arkplanner-export-prefix', '')
				}<a target="_blank" rel="noreferrer noopener" href="https://planner.penguin-stats.io/">ArkPlanner</a>{
						ir('settings-arkplanner-export-suffix', '')
					}</h2>
				<div class={style.data_area}>
					<textarea
						ref={ark_planner_data_ref}
						class={style.save_data}
						name="ark_planner_data"
						id=""
						cols="auto" rows="3"
						value={JSON.stringify(ark_planner_data)}
					/>
					<div class={style.buttons}>
						<span onClick={e => copyArkPlannerData(e)}>{copy_ark_planner_data_state}</span>
						<span onClick={e => loadArkPlannerData(e)}>{load_ark_planner_data_state}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArkSettings;
