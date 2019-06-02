import React from 'preact';
import style from './style';

const Info = (props) => (
	<div class={style.wrapper}>
		<div class={style.info}>
			<h1><a href="https://ark-nights.com/">ARK-NIGHTS.com</a></h1>
			<hr />
			<h2>公告</h2>
			<span>2019-06-03</span>
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
			<hr />
			<h2>关于项目</h2>
			<p>沉迷培养干员，然而没有理智。<del>只好写点相关项目等理智恢复</del></p>
			<p>感谢以下网站及大佬</p>
			<ul>
				<li><a target="_blank" rel="noreferrer noopener" href="http://wiki.joyme.com/arknights/">明日方舟wiki</a></li>
				<li><a target="_blank" rel="noreferrer noopener" href="https://graueneko.github.io/">明日方舟工具箱</a></li>
			</ul>
			<p>如果有各种建议或者意见，欢迎提Issue或微博找我</p>
			<p>
				如果你喜欢这个项目，并且希望作者能多<del>抽到几个6星</del>做些新feature，欢迎打赏催更（
				<span class={style.tip_link} href="">打赏二维码
					<img class={style.tip} src="../../assets/tip.png" alt="reward_author" />
				</span>
			</p>
	    <p>项目地址：<a target="_blank" rel="noreferrer noopener" href="https://github.com/Houdou/arkgraph">GitHub</a></p>
	    <p>作者： <a target="_blank" rel="noreferrer noopener" href="https://weibo.com/timeleap">@凤瞳</a></p>
			<hr />
			<h2>使用说明</h2>
			<h3>干员晋升清单</h3>
			<ul>
				<li>点击表格左下角的<code>+</code>添加一行干员数据</li>
				<li>输入干员名称，按<code>Tab</code>或<code>Enter</code>有自动补全功能。支持拼音和汉字模糊输入：例lapu，推推</li>
				<li>由于数据依赖于明日方舟Wiki站，所以新干员的数据可能会不全甚至找不到，请见谅</li>
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
			</ul>
			<h3>待实现功能</h3>
			<ul>
				<li>其他资源筛选功能</li>
				<li>增加其他图标</li>
				<li>……</li>
			</ul>
			<h3>计划中功能</h3>
			<ul>
				<li>与<a target="_blank" rel="noreferrer noopener" href="https://penguin-stats.io/">企鹅物流数据统计</a>合作，关联掉落概率数据</li>
				<li>活动道具或奖励计算表格</li>
				<li>添加关卡详细物品掉落数量，示例可以参考龙门币材料卡片</li>
				<li>作战记录关卡的掉落</li>
				<li>……</li>
				<li>欢迎提供建议: <a target="_blank" rel="noreferrer noopener" href="https://github.com/Houdou/arkgraph/issues">Issue board</a></li>
			</ul>
			<hr />
			<h2>更新日志</h2>
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
		</div>
	</div>
);

export default Info;
