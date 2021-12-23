
/**
 * Returns whether a value is null.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isNull(val) {

	return val === null;
}

/**
 * Returns whether a value is defined.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isDefined(val) {

	return val !== undefined;
}

/**
 * Returns whether a value is undefined.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isUndefined(val) {

	return val === undefined;
}

/**
 * Returns whether a value is an object.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isObject(val) {

	return typeof val === 'object' && val !== null;
}

/**
 * Returns whether a value is a function.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isFunction(val) {

	return typeof val === 'function';
}

/**
 * Returns whether a value is a number.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isNumber(val) {

	return typeof val === 'number';
}

/**
 * Returns whether a value is a string.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isString(val) {

	return typeof val === 'string';
}

/**
 * Returns whether a value is an empty string.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isEmptyString(val) {

	return isString(val) && val.length === 0;
}

/**
 * Returns whether a value is a non-empty string.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isNonEmptyString(val) {

	return isString(val) && val.length !== 0;
}

/**
 * Returns whether a value is an array.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isArray(val) {

	return Object.prototype.toString.call(val) === '[object Array]';
}

/**
 * Returns whether a value is not empty array.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isNotEmptyArray(val) {

	return isArray(val) && val.length !== 0;
}

/**
 * Returns whether a value is contains atleat one field.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isNotEmptyObject(val) {

	return isObject(val) && isNotEmptyArray(Object.keys(val));
}

/**
 * Returns whether a string is JSON or not.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isJsonString(val) {
	try {
		JSON.parse(val);
	} catch (e) {
		return false;
	}
	return true;
}
