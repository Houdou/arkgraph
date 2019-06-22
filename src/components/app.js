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

import fetchStatMatrix from '../services/penguinstats';

const App = (props) => {
	const [currentUrl, setCurrentUrl] = useState('/');
	const {
		config,
		load,
		toggleShowAllResources,
		toggleShowFocusMaterials,
		toggleShowFilter,
		toggleShowExp,
		toggleShowAnnouncementCodeOnce,
		setFilters,
	} = useConfig();

	const [drops, setDrops] = useState([]);

	const data = useData();

	useEffect(() => {
		load();
		fetchStatMatrix().then(matrix => {
			setDrops(matrix);
		});
	}, []);

	return (
		<div id="app">
			<Header
				currentUrl={currentUrl}
				config={config}
				toggleShowAllResources={toggleShowAllResources}
				toggleShowFocusMaterials={toggleShowFocusMaterials}
				toggleShowFilter={toggleShowFilter}
				toggleShowExp={toggleShowExp}
			/>
			<Router onChange={e => setCurrentUrl(e.url)}>
				<ArkInfo
					path="/"
					toggleShowAnnouncementCodeOnce={toggleShowAnnouncementCodeOnce}
					showAnnouncementCodeOnce={config.showAnnouncementCodeOnce}
				/>
				<ArkTable path="/table"
					config={config}
					data={data}
					toggleShowFilter={toggleShowFilter}
					setFilters={setFilters}
					drops={drops}
				/>
				<ArkOperator path="/operator/:operator_name?" config={config} data={data} />
				<ArkMaterials path="/materials/:material_name?" config={config} data={data} />
				<ArkBackup path="/backup" state={data.state} load={data.load} />
			</Router>
		</div>
	);
};

export default App;
