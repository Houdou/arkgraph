import React from 'preact';
import { Router } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';

import useConfig from '../config/useConfig';

import Header from './header';

import ArkTable from '../routes/table';

const App = (props) => {
	const [currentUrl, setCurrentUrl] = useState('/');
	const { config, load, toggleShowAllResources } = useConfig();

	useEffect(() => {
		load();
	}, []);

	return (
		<div id="app">
			<Header
				config={config}
				toggleShowAllResources={toggleShowAllResources}
			/>
			<Router onChange={e => setCurrentUrl(e.url)}>
				<ArkTable path="/" config={config} />
			</Router>
		</div>
	);
};

export default App;
