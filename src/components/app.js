import React from 'preact';
import { Router } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';

import useConfig from '../config/useConfig';

import Header from './header';

import ArkTable from '../routes/table';
import ArkOperator from '../routes/operator';
import ArkMaterials from '../routes/materials';
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
		toggleShowExp,
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
				toggleShowExp={toggleShowExp}
			/>
			<Router onChange={e => setCurrentUrl(e.url)}>
				<ArkInfo path="/" />
				<ArkTable path="/table" config={config} data={data} />
				<ArkOperator path="/operator/:operator_name?" config={config} data={data} />
				<ArkMaterials path="/materials/:material_name?" config={config} data={data} />
				<ArkBackup path="/backup" state={data.state} load={data.load} />
			</Router>
		</div>
	);
};

export default App;
