import React from 'preact';
import { useEffect, useState } from 'preact/hooks';

const clampRange = (value, min, max) => Math.max(Math.min(value || 0, max), min);

const AutoPrint = ({
	data = [],
	speed,
	show,
	setShow,
}) => {
	const [print, setPrint] = useState(['']);

	useEffect(() => {
		if (!data || data.length === 0) return;

		let content = '';
		let lines = [''];
		let rowIndex = 0;
		let charIndex = 0;
		setPrint(['']);
		const interval = setInterval(() => {
			const str = data[clampRange(rowIndex, 0, data.length - 1)][clampRange(charIndex, 0, data[rowIndex].length - 1)];
			content += str;
			charIndex++;
			lines.splice(lines.length - 1, 1, content);
			if (charIndex === data[rowIndex].length) {
				rowIndex++;
				charIndex = 0;
				lines.push('');
				content = '';
			}
			if (rowIndex === data.length) {
				lines.pop();
				clearInterval(interval);
				setShow(true);
			}
			setPrint([...lines]);
		}, speed);

		return () => {
			clearInterval(interval);
		};
	}, [show]);

	return (
		<code style={{ padding: '20px', width: '100%', fontSize: '15px', color: '#DDD' }}>
			{ show ? (
				print.map(line => (
					<span style={{ display: 'block', minHeight: '18px', wordBreak: 'break-all' }}>{line}</span>
				))
			) : (
				data.map(line => (
					<span style={{ display: 'block', minHeight: '18px', wordBreak: 'break-all' }}>{line.join('')}</span>
				))
			)}
		</code>
	);
};

export default AutoPrint;
