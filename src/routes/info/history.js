import React from 'preact';
const { Fragment } = React;

export const announcement = {
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
			<p>（小声）在下面更新了打赏链接0w0，如果大佬们愿意支持的话……</p>
		</Fragment>
	),
};

const ArkHistory = () => (
	<div>
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
