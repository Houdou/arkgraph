import { useState } from 'preact/hooks';

const buildFlags = (options, values = []) => {
	let flags = {};
	options.forEach((v, i) => {
		flags[v.value] = values[i] || false;
	});
	return flags;
};

const useFilterSetting = ({ options, field }, initial_value = {}) => {
	if (Object.entries(initial_value).every(([k, v]) => v)) {
		initial_value = {};
	}

	const [setting, setSetting] = useState(
		options.map((option, index) => Boolean(false || initial_value[option.value]))
	);

	const getOption = () => {
		if (setting.some(Boolean)) {
			return setting;
		}
		return [...setting].map(e => true);
	};

	const getFilter = () => ({
		field,
		flags: buildFlags(options, getOption()),
	});

	const toggle = (index) => {
		const new_setting = [...setting];
		new_setting[index] = !new_setting[index];
		setSetting(new_setting);
	};

	const resetAll = () => {
		setSetting([...setting].map(e => false));
	};

	const enableAll = () => {
		setSetting([...setting].map(e => true));
	};

	return {
		setting,
		toggle,
		getOption,
		getFilter,
		resetAll,
		enableAll,
	};
};

export default useFilterSetting;
