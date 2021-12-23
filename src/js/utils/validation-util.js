import { isArray, isString } from './type-util';

const urlRegex = new RegExp(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/);
const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const mobileRegex = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
const alphaNumeric = /^[0-9a-zA-Z]+$/;

/**
 * Validation for proper domain names
 *
 * @param {*} domains
 */
export const validateDomain = domain => {
	const validationString = new RegExp(
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
		'gi'
	);

	return validationString.test(domain);
};

/**
 * validation for Email
 *
 * @param  {*} str
 * @return {Boolean}
 */

export const validateEmail = str => {
	const validationString = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line no-useless-escape
	);

	return validationString.test(str);
};

/**
 * Returns whether a value is a valid URL.
 *
 * @param  {*} val
 * @return {Boolean}
 */

export function isValidUrl(val) {

	return isString(val) && urlRegex.test(val);
}

/**
 * Returns whether a value is a valid Email format.
 *
 * @param  {*} val
 * @return {Boolean}
 */

export function isValidEmail(val) {
	return isString(val) && emailRegex.test(val);
}

/**
 * Returns whether a value is in multiple valid Email format.
 * valid formats: 'abc@xyz.com,xyz.abc.com', 'abc@xyz.com'
 *
 * @param  {*} val
 * @return {Boolean}
 */

export function isValidMultipleEmails(val) {
	let isValid = true;
	let emailArr = [];
	if (isArray(val)) {
		emailArr = [...val];
	}
	if (isString(val)) {
		emailArr = val.split(',');
	}

	emailArr.find(email => {
		email = email.trim();
		if (!isValidEmail(email)) {
			isValid = false;
		}
	});
	return isValid;
}

/**
 * Returns whether a value is a valid Email format.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isValidMobile(val) {

	return isString(val) && mobileRegex.test(val);
}

/**
 * Returns whether a value is a valid Alpha Numeric.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isValidAlphaNumeric(val) {
	return isString(val) && alphaNumeric.test(val);
}

