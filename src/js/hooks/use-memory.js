
import { useState, useEffect, useCallback } from 'react';

const memory = {};

window.memory = memory;

/**
 * Uses state that syncs with memory.
 * To sync we just need to pass object with updated fields
 *
 * @example
 * <code>
 *     let [ value, setValue ] = useMemory('myKey', {});
 * </code>
 *
 * @param   {String} key
 * @param {Object} defaultValue
 * @returns {[*, Function]}
 */
export function useMemory(key, defaultValue) {

	let initialState = memory[key] || defaultValue;
	let [state, setState] = useState(initialState);

	useEffect(() => {
		memory[key] = state;
	}, []);

	let onChange = useCallback(event => {
		if (event.detail.key === key) {
			setState(event.detail.value);
		}
	}, [key]);

	useEffect(() => {
		window.addEventListener('memoryChange', onChange);
		return () => window.removeEventListener('memoryChange', onChange);
	}, [onChange]);

	let syncState = value => {
		let updated = { ...memory[key], ...value };
		setState(updated);
		memory[key] = updated;
		window.dispatchEvent(
			new CustomEvent('memoryChange', {
				detail: { key, value: updated }
			})
		);
	};

	return [state, syncState];
}
