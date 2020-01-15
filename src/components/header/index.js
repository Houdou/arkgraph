import React from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { STORAGE_VERSION } from '../../config/useConfig';

import Toggle from './toggle';

const Header = ({
	ir,
	currentUrl,
	config,
	toggleShowAllResources,
	toggleShowFocusMaterials,
	toggleShowFilter,
	toggleShowExp,
}) => (
	<header class={style.header}>
		<div class={style.title}>
			<h1>
				<a href="./table">
					<span class={style.deco}>:.:</span>{' '}{ir('app-title', 'Arknights | Planner')}
					<span class={style.version}>V{STORAGE_VERSION}</span>
				</a>
			</h1>
		</div>
		<div class={style.nav_group}>
			<nav>
				<Link activeClassName={style.active} href="/">{ir('header-nav-homepage', 'Homepage')}</Link>
				<Link activeClassName={style.active} href="/table">{ir('header-nav-table', 'Table')}</Link>
				<Link activeClassName={style.active} href="/operator">{ir('header-nav-operator', 'Operator')}</Link>
				<Link activeClassName={style.active} href="/materials">{ir('header-nav-material', 'Material')}</Link>
				<Link activeClassName={style.active} href="/farming">{ir('header-nav-farming', 'Farming')}</Link>
				<Link activeClassName={style.active} href="/stock">{ir('header-nav-stock', 'Stock')}</Link>
				<a href="https://map.ark-nights.com">{ir('header-nav-map', 'Map')}
					<img src="../../assets/icons/external.png" alt="external" style={{ margin: '0 0 0 4px', width: '12px', height: '12px' }} />
				</a>
				<Link activeClassName={style.active} href="/settings">{ir('header-nav-settings', 'Settings')}</Link>
				{currentUrl === '/' &&(
					<Link activeClassName={style.active} href="/settings">{ir('header-nav-language', 'Language')}</Link>
				)}
			</nav>
		</div>
		{
			currentUrl === '/table' && (
				<div class={style.toggles}>
					<Toggle
						value={config.showFilter || config.filters.length > 0}
						toggle={value => {
							toggleShowFilter(!config.showFilter || value);
						}}
						content={ir('table-options-filters', 'Filters')}
					/>
					<Toggle
						value={config.showAllResources}
						toggle={toggleShowAllResources}
						content={ir('table-options-show_all_resources', 'Show all resources')}
					/>
					<Toggle
						value={config.showFocusMaterials}
						toggle={toggleShowFocusMaterials}
						content={ir('table-options-show_focusing_materials', 'Show focusing')}
					/>
				</div>
			)
		}
	</header>
);

export default Header;
