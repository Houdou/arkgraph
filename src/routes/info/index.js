import React from 'preact';
import style from './style';

const Info = (props) => (
	<div class={style.wrapper}>
		<div class={style.info}>
			<h1><a href="https://ark-nights.com/">ARK-NIGHTS.com</a></h1>
			<hr />
			<h2>使用说明</h2>
			<ul>
				<li>点击表格左下角的<code>+</code>添加一行干员数据</li>
				<li>输入干员名称，按Tab或Enter有自动补全功能。支持拼音和汉字</li>
				<li>选择升级项目（精英化、技能、技能专精）</li>
				<li>输入目前等级</li><li>右边表格会自动查询所需材料并折叠不需要的材料列</li>
			</ul>
			<h3>已实现功能</h3>
			<ul>
				<li>干员数据查询</li>
				<li>自动本地保存</li>
				<li>自动折叠数据列</li>
			</ul>
			<h3>待实现功能</h3>
			<ul>
				<li>材料图标</li>
				<li>材料出处展示（预计在表格下方展示）</li>
				<li>输入完库存，会自动计算差值</li>
			</ul>
			<h3>Tips</h3>
			<blockquote><p>虽然干员没有显示备选项，但大概输对了就能找到（</p></blockquote>
			<hr />
			<h2>更新日志</h2>
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
	    <p>项目地址：<a target="_blank" rel="noreferrer noopener" href="https://github.com/Houdou/arkgraph">GitHub</a></p>
	    <p>作者： <a target="_blank" rel="noreferrer noopener" href="https://weibo.com/timeleap">@凤瞳</a></p>
		</div>
	</div>
);

export default Info;
