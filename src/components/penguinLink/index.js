import style from './style';
import cn from 'classnames';

const PenguinLink = ({
	id,
	category,
	render = '掉落概率',
	color = 'grey',
}) => (
	<span class={style.penguin_span}>
		<img
			class={style.icon}
			src={`../assets/icons/${color === 'white' ? 'penguin_black' : 'penguin'}.png`} alt="penguin"
		/>
		<a
			class={cn(
				style.penguin_link,
				style[color]
			)}
			target="_blank"
			rel="noreferrer noopener"
			href={`https://penguin-stats.io/result/${category}/${id}`}
		>{render}</a>
	</span>
);

export default PenguinLink;
