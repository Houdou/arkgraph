import React from 'preact';
const { Fragment } = React;

import AutoPrint from './autoPrint';
import ArkItem from '../../components/item';

const printer = props => (
	<AutoPrint
		data={[
			['控制中枢更新中','','.','','.','','.','','.','','.','','.',''],
			['1 更新可用：'],
			['-',' ','与【企鹅物流数据统计】的神经连接已可用！'],
			[''],
			['正在尝试与Penguin-Stats.io建立神经连接'],
			['========================================'],
			['[0/3]校验递质浓度','.','','.','','.','','','正常'],
			['[1/3]检查神经连接','.','.','.','','正常'],
			['[2/3]接收反馈信息','.','.','.','0%','.','.','.','70%','.','.','.','完成'],
			['','','[3/3]', '已建立神经连接.'],
			['========================================'],
			['','','','','',''],
			['更新完成，请开启材料卡片查看掉落数据'],
		]}
		speed={200}
		show={!props.showAnnouncementCodeOnce}
		setShow={props.toggleShowAnnouncementCodeOnce}
	/>
);

export const announcement = {
	'2019-12-24': (
		<Fragment>
			<p>2019-11-26</p>
			刷图规划里【合成消耗龙门币】和【预计获得龙门币】写反了（扶额<br />
			感谢指出<br />
			<br />
			<p>2019-11-21</p>
			响应用户需求，添加了需求可通过合成完成的提示: <br />
			<div style={{ display: 'flex', flexFlow: 'column', padding: '8px 24px' }}>
				<div style={{ display: 'flex', height: '28px', alignItems: 'center' }}>可完成：{' '}
					<img src="../../../assets/icons/tick.png" alt="tick" style={{
						height: '20px',
						opacity: 1,
					}}
					/>
				</div>
				<div style={{ display: 'flex', height: '28px', alignItems: 'center' }}>可通过合成完成：{' '}
					<img src="../../../assets/icons/tick.png" alt="tick" style={{
						height: '20px',
						opacity: 0.6,
						borderRadius: '50%',
						background: '#00b0d1',
					}}
					/>
					<small>（但不能直接点击以完成……）</small>
				</div>
				<div style={{ display: 'flex', height: '28px', alignItems: 'center' }}>材料不足：{' '}
					<img src="../../../assets/icons/tick.png" alt="tick" style={{
						height: '20px',
						opacity: 0.2,
					}}
					/>
				</div>
			</div>
			如果<b>勾选了【折算合成材料】</b>的话，就会检查合成原料是否足够<br />
			<br />
			在刷图页面添加了【溢出】筛选功能<br />
			之后有空会继续添加一些小功能，比如刷图时自动增加对应关卡的龙门币掉落数量<br />
			或者拆分等级提升需求等等<br />
			<br />
			另外，既然日服快开了（<del>怕不是得等明年</del>），打算和【PRTS.Map】一起加一下日文界面<br />
			不知道有没有大佬愿意帮个忙，我自己的水平去翻译的话实在有点捉急（<br />
			下面有联系方式，欢迎来戳<br />
		</Fragment>
	),
	'2019-08-27': (
		<Fragment>
			<p>2019-08-26</p>
		这段时间在忙着开发【PRTS.Map】，一直没有更新培养表。现在地图查看工具正式发布啦~<br />
		欢迎大家来试用~：<br />
			<b><a target="_blank" rel="noreferrer noopener" href="https://map.ark-nights.com/">Map.Ark-Nights.com</a></b><br />
		这边等夏活开始之后会更新新干员数据的~
			<br />
			<p>2019-07-27</p>
			<p>
			增加了一些材料和关卡的链接，现在查询页面大部分名称图标都可以直接跳到对应材料/干员的详情页<br /><br />
			【库存整理.β】页面已经拆分到<a href="/farming">【刷图】</a>与<a href="/stock">【库存】</a><br />
			后台数据显示大部分人选择使用仓库顺序显示，已经更改了材料列表的默认显示选项~<br />
			（这样列表确实会短很多<br /><br />
			此外，给【刷图】和【库存】页面里的材料添加了红色的数字标<br />
			和材料卡片里的红色背景数字的语义一样，表示现在缺少多少个<br /><br />
			举个🌰：
				<div style={{ height: '56px', padding: '44px 24px', position: 'relative' }}>
					<ArkItem
						id="M-3-8"
						tier="T4"
						scale={0.46}
						quantity={2}
						requirement={14}
					/>
					<span style={{ position: 'absolute', left: '100px', bottom: '16px' }}>←这个（<small>要吃14个锰的陨星……</small></span>
				</div>
				<br /><br />
			也有不少用户在用ArkPlanner，这边会开始进行进一步的整合<br />
			做好之后，<a href="/farming">直接在培养表内</a>就可以用了<br />
			</p>
		</Fragment>
	),
	'2019-07-27': (
		<Fragment>
			<p>
			在<a href="/backup">【数据导出】</a>中添加了<a target="_blank" rel="noopener noreferrer" href="https://planner.penguin-stats.io/">ArkPlanner</a>的数据格式导出功能<br />
			之后会整合进来，先放出来手动导出的版本
			</p>
			<p>2019-07-09</p>
			<h3>
				<a style={{
					color: '#0CC3E7',
				}} target="_blank" rel="noreferrer noopener" href="https://www.weibo.com/1146775001/HCRa62aoa"
				>微博抽奖中~，欢迎来转~</a>
			</h3>
		更新了新干员数据~，陈sir来了~<br />
		更新了第五章的掉落数据~<br />
			<p>2019-07-06</p>
		加了个暂时隐藏需求的按钮，方便大家专注于目前培养的需求行~<br />
			<p>2019-06-22</p>
			<p>
				现在具体关卡掉率会显示在材料卡片底下了<br />
				数据来自于<a target="_blank" rel="noreferrer noopener" href="https://penguin-stats.io/">企鹅物流数据统计</a><br />
				<h2>项目现已改名【干员培养表】</h2><br />
				现在的功能已经不止是材料计算器了，感觉更偏向于规划干员培养，管理材料库存<br />
				改个名字，<del>增加品牌辨识度（</del><br />
			</p>
		</Fragment>
	),
	'2019-06-22': (
		<Fragment>
			<p>2019-06-18</p>
			<p>
				各位久等啦，最近有些忙，没有太多时间更新，所以筛选功能拖了一周<br />
				基本上能够解决一些反馈中提到的列表太宽不方便查数据的问题<br />
				右上角新增了【筛选材料】功能，可以用来…………筛选。。。<br />
				筛选页面中，可以点击左侧标题勾选全部分类，再取消某个单独希望隐藏的类别<br />
				可以点击【显示全部资源】来清除筛选条件<br />
				移动端现在基本上是个可用水平，仍然建议使用电脑打开~<br />
				下一步计划是和企鹅数据api的接入以及一些其他UX的优化~<del>继续画饼（</del><br />
			</p>
		</Fragment>
	),
	'2019-06-06': (
		<Fragment>
			<span>2019-06-06</span>
			做了个材料反查功能，还在开发中，放出来测试一下~<br />
			顺便再增加了点移动端适配，但实在是不是为手机设计的UX，只能将就用……<br />
		</Fragment>
	),
	'2019-06-04': (
		<Fragment>
			<span>2019-06-03</span>
			干员培养写好啦~<br />
			最快5秒！就能添加一个干员的所有需求（<b>不要被合计材料数量吓到……</b><br />
			具体使用说明请看下方使用说明→干员培养<br />
		</Fragment>
	),
	'2019-06-03': (
		<Fragment>
			<p>
			表格入口挪到上面<code>计算器</code>标签去了~<br />
			干员等级提升和经验卡的需求计算做好了~<br />
			大家关心的升级项目的现等级和目标等级的功能会开一个新页面【干员培养】<br />
			具体流程：
				<ul>
					<li>输入干员名称<b>（只用输一次啦！）</b></li>
					<li>输入现在和目标的等级、精英化等级、技能等级和目标等级</li>
					<li>自动生成对应的材料需求数据条预览</li>
					<li>一键添加全部到主界面</li>
					<li>接下来就和原来的使用逻辑一样了</li>
				</ul>
				可以到这里看一下预览：<a target="_blank" rel="noreferrer noopener" href="https://bbs.nga.cn/read.php?tid=17417159">NGA帖子链接</a>
			</p>
			<p>
			在<code>V1.2.7</code>也改进了一点移动端适配<br />
			</p>
			<p>
				其实这工具用的人还挺多的。。。服务器一个月的流量不知道能不能撑住大家的访问……<br />
				<small>（小声）</small>在下面有打赏链接0w0，如果大佬们愿意支持的话（
			</p>
		</Fragment>
	),
	'2019-06-01': (
		<Fragment>
			<p>
			收到很多建议说希望能直接输入升级项目的现等级和目标等级的功能，这周末会努力做出来的~<br />
			顺便会把等级提升和经验卡的需求也添加进来<br />
			但直接做在主界面会有点乱，现在的考虑是会开一个新页面【干员培养】
				<ul>
					<li>输入现在的等级、精英化等级、技能等级和目标等级</li>
					<li>会生成对应的数据条添加回主界面</li>
					<li>接下来就和原来的使用逻辑一样了</li>
				</ul>
			</p>
			<p>
			关于移动端适配，有一些些复杂，需要考虑交互问题，缩小界面会很难用<br />
			而且在手机上来回切换游戏和工具也挺麻烦的<br />
			比较舒服的使用场景还是使用额外的屏幕打开本工具<br />
			但总的来说我还是会尽量去做的，谢谢大家支持<br />
			祝大家儿童节快乐~
			</p>
			<p>（小声）在
			下面更新了打赏链接0w0，如果大佬们愿意支持的话……</p>
		</Fragment>
	),
};

const ArkHistory = () => (
	<div>
		<h3>V1.4.0</h3>
		<ul>
			<li>增加了材料筛选功能</li>
			<li>增加了经验值数值显示</li>
			<li>优化移动端显示</li>
			<li>默认设置合成4、5级材料</li>
		</ul>
		<h3>V1.3.3</h3>
		<ul>
			<li>修复了材料反查的需求数量显示Bug</li>
			<li>为计算器，干员培养，材料反查改善了移动端布局适配</li>
		</ul>
		<h3>V1.3.2</h3>
		<ul>
			<li>增加了材料反查.β</li>
		</ul>
		<h3>V1.3.1</h3>
		<ul>
			<li>改进了合成需求的数量显示文字</li>
			<li>改善了部分UI交互</li>
		</ul>
		<h3>V1.3.0</h3>
		<ul>
			<li>增加了干员培养界面</li>
			<li>干员培养界面显示干员升级消耗材料统计</li>
		</ul>
		<h3>V1.2.7</h3>
		<ul>
			<li>增加了干员升级的计算</li>
			<li>对一部分UI改善了响应式布局</li>
			<li>变更了落地页</li>
		</ul>
		<h3>V1.2.6-γ</h3>
		<ul>
			<li>补全了现版本干员数据</li>
		</ul>
		<h3>V1.2.6</h3>
		<ul>
			<li>更换了缓存方式，现在只缓存图片，网站会一直保持最新</li>
			<li>但同时也移除了离线支持（</li>
		</ul>
		<h3>V1.2.5</h3>
		<ul>
			<li>增加了斯卡蒂，格拉尼，夜魔，月见夜的数据，（暂缺猎蜂</li>
			<li>增加了打赏（</li>
		</ul>
		<h3>V1.2.4</h3>
		<ul>
			<li>下拉选单中显示技能名称</li>
			<li>修复了Edge（或许包括其他浏览器）无法变更升级项目的Bug</li>
		</ul>
		<h3>V1.2.3</h3>
		<ul>
			<li>增加了部分干员数据</li>
			<li>修复了需合成材料的库存量没有被计算在内的问题</li>
		</ul>
		<h3>V1.2.2</h3>
		<ul>
			<li>增加了数据备份功能</li>
			<li>优化了界面布局</li>
		</ul>
		<h3>V1.2.1</h3>
		<ul>
			<li>增加了快捷库存操作</li>
			<li>改变了界面布局</li>
		</ul>
		<h3>V1.2.0</h3>
		<ul>
			<li>增加了材料合成计算相关功能</li>
			<li>增加了追踪材料功能</li>
			<li>完善了材料卡片布局</li>
		</ul>
		<h3>V1.1.0</h3>
		<ul>
			<li>增加了材料卡片</li>
			<li>增加了追踪材料功能</li>
			<li>改变了界面布局</li>
		</ul>
		<h3>V1.0.4</h3>
		<ul>
			<li>进一步提高了干员名称拼音输入查找的准确性</li>
			<li>修复了一些操作Bug</li>
		</ul>
		<h3>V1.0.3</h3>
		<ul>
			<li>添加了材料图标</li>
			<li>修复了Edge选项显示不正确的Bug</li>
		</ul>
		<h3>V1.0.2</h3>
		<ul>
			<li>调整了添加干员按钮位置</li>
			<li>提高了干员名称拼音输入查找的准确性</li>
		</ul>
		<h3>V1.0.1</h3>
		<ul><li>实现了干员名称拼音输入查找.β</li></ul>
		<h3>V1.0.0</h3>
		<ul><li>实现了基本功能</li></ul>
		<hr />
	</div>
);

export default ArkHistory;
