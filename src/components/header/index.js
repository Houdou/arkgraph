import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { STORAGE_VERSION } from '../../config/useConfig';

import Toggle from './toggle';

const Header = ({
	currentUrl,
	config,
	toggleShowAllResources,
	toggleShowFocusMaterials,
	toggleShowExp,
}) => (
	<header class={style.header}>
		<div class={style.title}>
			<h1>
				<a href="./table">
					<span class={style.deco}>:.:</span>  明日方舟 | 材料计算器
					<span class={style.version}>V{STORAGE_VERSION}</span>
				</a>
			</h1>
			<nav>
				<Link activeClassName={style.active} href="/">首页</Link>
				<Link activeClassName={style.active} href="/table">计算器</Link>
				<Link activeClassName={style.active} href="/operator">干员培养</Link>
				<Link activeClassName={style.active} href="/materials">材料反查.β</Link>
				<Link activeClassName={style.active} href="/backup">数据备份</Link>
			</nav>
		</div>
		{
			currentUrl === '/table' && (
				<div class={style.toggles}>
					<Toggle
						value={config.showAllResources}
						toggle={toggleShowAllResources}
						content="显示全部资源"
					/>
					<Toggle
						value={config.showFocusMaterials}
						toggle={toggleShowFocusMaterials}
						content="显示追踪材料"
					/>
				</div>
			)
		}
	</header>
);

export default Header;
