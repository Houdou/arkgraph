import React from 'preact';
import { Router } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';

import useConfig from '../config/useConfig';

import Header from './header';

import ArkTable from '../routes/table';
import ArkInfo from '../routes/info';
import ArkBackup from '../routes/backup';

import useData from '../models/useData';

const App = (props) => {
	const [currentUrl, setCurrentUrl] = useState('/');
	const {
		config,
		load,
		toggleShowAllResources,
		toggleShowFocusMaterials,
	} = useConfig();

	const data = useData();

	useEffect(() => {
		load();
	}, []);

	return (
		<div id="app">
			<Header
				currentUrl={currentUrl}
				config={config}
				toggleShowAllResources={toggleShowAllResources}
				toggleShowFocusMaterials={toggleShowFocusMaterials}
			/>
			<Router onChange={e => setCurrentUrl(e.url)}>
				<ArkTable path="/" config={config} data={data} />
				<ArkInfo path="/info" />
				<ArkBackup path="/backup" state={data.state} load={data.load} />
			</Router>
		</div>
	);
};

export default App;
