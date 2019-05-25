import { h } from 'preact';
// import { Link } from 'preact-router/match';
import style from './style';

import Toggle from './toggle';

const Header = ({
	config,
	toggleShowAllResources,
}) => (
	<header class={style.header}>
		<h1><span style="font-family: 'san-serif'; font-weight: 100;">:.:</span>  Ark Table</h1>
		<div class={style.toggles}>
			<Toggle
				value={config.showAllResources}
				toggle={toggleShowAllResources}
				content="显示全部资源"
			/>
		</div>
	</header>
);

export default Header;
