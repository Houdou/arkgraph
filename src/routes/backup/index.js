import React from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import style from './style';

import Upgrade from '../../models/Upgrade';
import { STORAGE_KEY as SAVE_STORAGE_KEY } from '../../models/useData';
import { STORAGE_KEY as CONFIG_STORAGE_KEY } from '../../config/useConfig';

const ArkDataBackup = ({
	state,
	load,
}) => {
	const code_ref = useRef(null);
	const [copy_state, setCopyState] = useState('复制');
	const [load_state, setLoadState] = useState('读取');
	const [load_error, setLoadError] = useState(null);

	useEffect(() => {
		load();
	}, []);

	const copyData = (e) => {
		code_ref.current && code_ref.current.select();
		try {
			document.execCommand('copy');
			setCopyState('已复制');
		} catch (err) {
			console.error(err);
			setCopyState('失败');
		}
	};

	const loadData = (e) => {
		if (code_ref.current) {
			let input_value = code_ref.current.value;
			try {
				load(code_ref.current.value);
				setLoadState('成功');
			} catch (err) {
				code_ref.current.value = input_value;
				console.error(err);
				setLoadError(err.details);
				setLoadState('失败');
			}
			setTimeout(() => setLoadState('读取'), 1000);
		}
	};

	return (
		<div class={style.wrapper}>
			<div class={style.info}>
				<h1><a href="https://ark-nights.com/">ARK-NIGHTS.com</a></h1>
				<hr />
				<h2>数据备份</h2>
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
						window.localStorage.removeItem(CONFIG_STORAGE_KEY);
						window.localStorage.removeItem(SAVE_STORAGE_KEY);
						window.location.reload();
					}}
				>双击清除所有数据</div>
			</div>
		</div>
	);
};

export default ArkDataBackup;
