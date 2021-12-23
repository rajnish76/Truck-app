
import moment from 'moment';

import { isUndefined, isNull, isObject, isArray, isNotEmptyObject } from './type-util';

/**
 * Resolves an object property from a string representing the path in dot notation.
 *
 * @param   {Object} source
 * @param   {String} path
 * @param   {*}      [defaultValue]
 * @returns {*}
 */
export function resolveProp(source, path, defaultValue) {

	let parts = String(path).split('.');
	let prop = parts.shift();
	let result = source;

	while (prop) {

		if (isUndefined(result[prop]) || isNull(result[prop])) {
			return defaultValue;
		} else {
			result = result[prop];
		}

		prop = parts.shift();
	}

	return result;
}

/**
 * Deep merges a target object by copying the values of all enumerable own properties from
 * one or more source objects to the target object. Properties in the target object will
 * be overwritten by properties in the sources if they have the same key. Sources are applied
 * from left to right in the arguments list.
 *
 * @param   {Object}    target      The target object.
 * @param   {...Object} [sources]   One or more source objects to merge.
 * @returns {Object}
 */
export function merge(target, ...sources) {

	sources.forEach(source => {
		for (let key in source) {
			if (source.hasOwnProperty(key)) {

				if (isObject(target[key]) && !isArray(target[key]) &&
					isObject(source[key]) && !isArray(source[key])) {

					target[key] = merge({}, target[key], source[key]);

				} else {

					target[key] = source[key];
				}
			}
		}
	});

	return target;
}

/**
 * Deep copies an array or object
 *
 * @param   {Object}    source      The target object.
 * @returns {Object}
 */
export function deepCopy(source) {

	let result;
	if (source instanceof moment) {
		result = source.clone();
		if (source.formValue) result.formValue = source.formValue;
		if (source.type) result.type = source.type;
	} else if (isArray(source)) {
		result = [];
		source.map((el, index) => {
			result[index] = deepCopy(source[index]);
		});
	} else if (isObject(source)) {
		result = {};
		Object.keys(source).map(key => {
			if (source.hasOwnProperty(key)) {
				result[key] = deepCopy(source[key]);
			} else {
				result[key] = source[key];
			}
		});
	} else {
		result = source;
	}
	return result;
}

/**
 * Getting the error response message
 *
 * @param   {Object}    error      The error response.
 * @returns {String}
 */
export function responseError(error) {
	let errMsg;
	if (error?.response?.data) {
		if (error.response.data.errors?.length) {
			errMsg = error.response.data.errors.map(e => e.defaultMessage).join('\n');
		} else if (error.response.data.message) {
			errMsg = error.response.data.message;
		} else {
			errMsg = error.message;
		}
	} else if (error?.message) {
		errMsg = error.message;
	} else {
		errMsg = error;
	}

	if (errMsg?.includes?.('timeout')) {
		errMsg = 'Your request has been timed out. Please try again!';
	}
	return errMsg;
}

/**
 * Getting the Params Object from a Params String
 *
 * @example ?id=randomId&id2=randomId2
 * @param   {String}    paramString      The param string.
 * @returns {Object}
 */
export function convertParamStringToObject(paramString) {
	let arr = [];
	if (paramString) {
		arr = paramString.slice(1).split(/&|=/); // remove the "?", "&" and "="
	}
	let params = {};

	for (let i = 0; i < arr.length; i += 2) {
		const key = arr[i];
		const value = arr[i + 1];
		params[key] = value; // build the object = { limit: "10", page:"1", status:"APPROVED" }
	}
	return params;
}

export const convertObjectToParamString = params => {
	let paramString = '';
	if (isNotEmptyObject(params)) {
		paramString = '?' + Object.entries(params).map(([key, value]) => key + '=' + (value ?? '')).join('&');
	}
	return paramString;
};

/**
 * Getting a unique Id
 *
 * @returns {String}
 */
export function getUniqueId() {
	return Math.random()
		.toString(36)
		.substring(2);
}
