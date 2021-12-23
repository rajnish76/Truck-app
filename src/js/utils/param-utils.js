export const convertToObject = url => {
	const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
	let params = {};
	for (let i = 0; i < arr.length; i += 2) {
		const key = arr[i];
		const value = arr[i + 1];
		params[key] = value;
	}
	return params;
};

export const paramsSerializer = params =>
	Object.entries(params).map(([key, value]) =>
		key + '=' + (value || '')).join('&') || '';
