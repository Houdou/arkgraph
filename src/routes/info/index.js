import React from 'preact';
import style from './style';

import AutoPrint from './autoPrint';
import ArkMaterialCard from '../../components/materialCard';

import { STORAGE_VERSION } from '../../config/useConfig';

const Info = (props) => (
	<div class={style.wrapper}>
		<div class={style.info}>
			<h1><a href="https://ark-nights.com/">ARK-NIGHTS.com</a></h1>
			<h3 class={style.mobile_title}>明日方舟 | 干员培养表 <small>v{STORAGE_VERSION}</small></h3>
			<hr />
			<h2>公告</h2>
			<p>2019-07-06</p>
			更新了新干员数据~，陈sir来了~<br />
			<p>2019-07-06</p>
			加了个暂时隐藏需求的按钮，方便大家专注于目前培养的需求行~<br />
			<p>2019-06-22</p>
			<p>
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
			</p>
			{
				props.showAnnouncementCodeOnce && (
					<p>
						<a href="#" onClick={e => {
							try {
								global.ga('send', {
									hitType: 'event',
									eventCategory: 'autoprint',
									eventAction: 'replay',
								});
							} catch (err) {}
							props.toggleShowAnnouncementCodeOnce(false);
						}}
						>再一次再一次（</a><br /><br />
						现在具体关卡掉率会显示在材料卡片底下了<br />
						数据来自于<a target="_blank" rel="noreferrer noopener" href="https://penguin-stats.io/">企鹅物流数据统计</a><br />
						<div style={{ marginTop: '20px', padding: '32px', textShadow: 'none', position: 'relative', userSelect: 'none' }}>
							举个🌰:<br />
							<ArkMaterialCard
								key={'M-3-10'}
								id={'M-3-10'}
								card_index={0}
								class={style.card}
								stock={{ 'M-3-10': 2 }}
								adjustStockItem={e => e}
								summary={{ 'M-3-10': 5 }}
								shortage={{ 'M-3-10': 3 }}
								toggleFocusMaterial={e => e}
								addFocusMaterials={e => e}
								compound_materials={{}}
								compounded={false}
								toggleCompoundMaterial={e => e}
								compoundMaterial={e => e}
								drops={[
									{ itemId: '30103', times: 2296, quantity: 650, stageId: 'main_02-10' },
									{ itemId: '30103', times: 2554, quantity: 734, stageId: 'main_04-09' },
								]}
							/>
							<div style={{
								position: 'absolute',
								left: '100px',
								top: '200px',
								backgroundColor: 'rgba(130, 60, 60, 0.2)',
								width: '184px',
								height: '56px',
								zIndex: 9999,
							}}
							/>
						</div>
						<h2>项目现已改名【干员培养表】</h2><br />
						现在的功能已经不止是材料计算器了，感觉更偏向于规划干员培养，管理材料库存<br />
						改个名字，<del>增加品牌辨识度（</del><br />
					</p>
				)
			}
			<hr />
			<p>
				<h2>关于访问量</h2>
				感谢大家的支持，这计算器的访问量真的超乎我的想象<br />
				服务器一个月<code>100G</code>流量，已经尽量通过加前端缓存和减少图片使用来减少流量消耗<br />
				（首次加载约<code>3M</code>，之后的访问都是<code>~20K</code>）<br />
				现在的使用量：<code>64G</code>（2019-06-17）<br />
				<br />
				<small>（小声）</small>在右边有打赏/捐助链接0w0，如果大佬们愿意打赏或者捐助一点服务器费用的话，我会非常感激的！
				<a class={style.tip_link} href="../../assets/tip.png">打赏/捐助二维码
					<img class={style.tip} src="../../assets/tip.png" alt="reward_author" />
				</a>
			</p>
			<hr />
			<h2>关于项目</h2>
			<p>沉迷培养干员，然而没有理智。<del>只好写点相关项目等理智恢复</del></p>
			<p>感谢以下网站及大佬</p>
			<ul>
				<li><a target="_blank" rel="noreferrer noopener" href="http://wiki.joyme.com/arknights/">明日方舟wiki</a></li>
				<li><a target="_blank" rel="noreferrer noopener" href="https://graueneko.github.io/">明日方舟工具箱</a></li>
				<li><a target="_blank" rel="noreferrer noopener" href="https://penguin-stats.io/">企鹅物流数据统计</a></li>
			</ul>
			<p>如果有各种建议或者意见，欢迎到帖子留言，提Issue或微博找我</p>
			<p>NGA发布帖：<a target="_blank" rel="noreferrer noopener" href="https://bbs.nga.cn/read.php?tid=17417159">链接</a></p>
	    <p>项目地址：<a target="_blank" rel="noreferrer noopener" href="https://github.com/Houdou/arkgraph">GitHub</a></p>
	    <p>作者： <a target="_blank" rel="noreferrer noopener" href="https://weibo.com/timeleap">@凤瞳</a></p>
			<hr />
			<h2>使用说明</h2>
			<h3>干员培养表</h3>
			<ul>
				<li>点击表格左下角的<code>+</code>添加一行干员数据</li>
				<li>输入干员名称，按<code>Tab</code>或<code>Enter</code>自动补全</li>
				<li>选择升级项目（等级、精英阶段、技能、技能专精）</li>
				<li>输入目前等级，右边表格会自动查询所需材料并折叠不需要的材料列</li>
				<li>如果库存数量满足升级需求（按钮会自动点亮），可以点击左边第二列的确认按钮消耗对应材料并删除此行</li>
			</ul>
			<h3>材料追踪</h3>
			<ul>
				<li>点击<code>表头材料图标</code>或材料卡片中<code>合成原料图标</code>可添加/移除追踪材料</li>
				<li>点击<code>追踪所有原料</code>添加合成所需成分</li>
				<li>点击<code>折算合成原料</code>，需求数量自动将需求转化为合成原料需求</li>
				<ul>
					<li>由于可能产生循环计算问题，暂不添加芯片类同级转化的合成计算</li>
				</ul>
				<li>点击<code>材料大图标</code>可直接增加1个库存，右键减少1个</li>
				<li>点击<code>合成一份</code>将自动扣除原料数量，并增加1个到库存</li>
			</ul>
			<h3>干员查询</h3>
			<ul>
				<li>点击【干员查询】切换页面</li>
				<li>输入干员名称，按<code>Tab</code>或<code>Enter</code>有自动补全功能。支持拼音和汉字模糊输入：例lapu，推推</li>
				<li>选择干员目前等级以及培养目标，超出范围会自动修正</li>
				<li>如果有前置要求（如技能专精：需要精2＋基础技能7级），也会自动修正</li>
				<li>提供了几个快捷选项方便选择</li>
				<li>下方表格会自动查询所需材料并列出所有升级项目并汇总所有需求</li>
				<li>如果库存数量满足升级需求，会在【可完成】列打一个小勾勾表示可以直接升级该项</li>
			</ul>
			<h3>材料查询</h3>
			<ul>
				<li>点击【材料查询】切换页面</li>
				<li>输入材料名称，按<code>Tab</code>或<code>Enter</code>有自动补全功能。支持拼音和汉字模糊输入：例meng，纳米</li>
				<li>可以通过干员职业，稀有度，升级项目来筛选</li>
				<li>下方表格会自动显示所有需要这个材料的升级项目</li>
			</ul>
			<h3>库存管理</h3>
			<ul>
				<li>点击【库存管理】切换页面</li>
				<li>下方会显示所有材料</li>
				<li>可点击显示选项更改不同分类方式</li>
				<li>左键增加库存量，右键减少，可以按<code>Shift</code>一次增减10个</li>
				<li>可输入关卡编号，按<code>Tab</code>或<code>Enter</code>有自动补全功能</li>
			</ul>
			<h3>Tips</h3>
			<blockquote><p>虽然输入干员名称时没有备选项，但支持模糊输入，大概输对了就能找到（</p></blockquote>
			<blockquote><p>你好，博士。你或许希望能在这找到Lancet-2，但Lancet-2什么升级都没有，毕竟她只是一台医疗机器人……</p></blockquote>
			<blockquote><p>建议使用最新版本Chrome打开本网站，开发精力有限，没有计划支持Chrome和Edge之外的浏览器</p></blockquote>
			<blockquote><p>材料表格太宽时，按住<code>Shift</code>再滚动鼠标滚轮<del>应该</del>可以横向滚动</p></blockquote>
			<hr />
			<h2>功能列表</h2>
			<h3>已实现功能</h3>
			<ul>
				<li>干员数据查询</li>
				<li>自动本地保存</li>
				<li>自动折叠数据列</li>
				<li>材料图标</li>
				<li>材料出处展示</li>
				<li>材料合成公式展示</li>
				<li>追踪材料</li>
				<li>输入完库存，会自动计算差值</li>
				<li>基于合成公式展开的单个需求计算</li>
				<li>合成消耗对应材料</li>
				<li>数据导入与导出</li>
				<li>升级经验计算</li>
				<li>单个干员培养需求的批量添加</li>
				<li>材料筛选显示</li>
				<li>关联【企鹅物流数据统计】掉落概率</li>
				<li>材料查询页面的筛选功能</li>
			</ul>
			<h3>待实现功能</h3>
			<ul>
				<li>其他筛选选项</li>
				<li>增加键盘快捷键</li>
				<li>添加关卡详细物品掉落数量，示例可以参考龙门币材料卡片</li>
				<li>……</li>
			</ul>
			<h3>计划中功能</h3>
			<ul>
				<li>欢迎提供建议: <a target="_blank" rel="noreferrer noopener" href="https://github.com/Houdou/arkgraph/issues">Issue board</a></li>
			</ul>
			<hr />
			<h2>更新日志</h2>
			<h3>V1.5.3</h3>
			<ul>
				<li>增加了新干员数据</li>
			</ul>
			<h3>V1.5.2</h3>
			<ul>
				<li>增加了隐藏需求行的功能</li>
			</ul>
			<h3>V1.5.1</h3>
			<ul>
				<li>增加了库存管理</li>
				<li>增加了库存管理页的关卡筛选功能</li>
			</ul>
			<h3>V1.5.0</h3>
			<ul>
				<li>链接【企鹅物流数据统计】的掉落数据</li>
				<li>增加了材料查询页面的筛选功能</li>
				<li>增加了采购凭证</li>
				<li>增加了一键追踪材料功能</li>
			</ul>
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
		</div>
	</div>
);

export default Info;
