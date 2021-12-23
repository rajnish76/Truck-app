
import { isObject, isArray, isString, isNonEmptyString } from './type-util';

/**
 * @type {symbol} Value used to brand enumeration objects.
 */
const ENUM = Symbol('enum');

/**
 * Determines whether a value is an enumeration object.
 *
 * @param   {*} val
 * @returns {Boolean}
 */
export function isEnum(val) {

	return isObject(val) && !!val[ ENUM ];
}

/**
 * Create a new enumeration based on a given specification.
 *
 * @param   {Object || Array} spec
 * @returns {{
 *     keys: (function(): Array),
 *     values: (function(): Array),
 *     includes: (function(*): Boolean),
 *     fromKey: (function(*): Object)
 * }}
 */
export function createEnum(spec) {

	if (!isObject(spec)) {
		throw Error('Enum argument must be an array or object');
	}

	if (isArray(spec) && spec.some(val => !isNonEmptyString(val))) {
		throw Error('Enum array must contain only non-empty strings');
	}

	let enumObject = {};

	Object.entries(spec).forEach(([ name, value ]) => {
		name = isString(value) ? value : name;
		let key = isString(value) ? value : value.hasOwnProperty('key') ? value.key : name;
		let props = isString(value) ? {} : value;
		enumObject[ name ] = Object.freeze({
			key,
			...props,
			toString: () => key.toString()
		});
	});

	Object.defineProperties(enumObject, {
		keys: {
			value: () => Object.values(enumObject).map(e => e.key),
			enumerable: false
		},
		values: {
			value: () => Object.values(enumObject),
			enumerable: false
		},
		includes: {
			value: key => !!Object.values(enumObject).find(e => e.key === key),
			enumerable: false
		},
		fromKey: {
			value: key => Object.values(enumObject).find(e => e.key === key),
			enumerable: false
		},
		[ ENUM ]: {
			value: true,
			enumerable: false
		}
	});

	Object.freeze(enumObject);
	return enumObject;
}
