
import { useState, useEffect, useCallback } from 'react';

/**
 * Uses state that syncs with local storage.
 *
 * @example
 * <code>
 *     let [ value, setValue ] = useLocalStorage('myKey');
 * </code>
 *
 * @param   {String} key
 * @returns {[*, Function]}
 */
export function useLocalStorage(key) {

	let initialState = JSON.parse(window.localStorage.getItem(key));
	let [ state, setState ] = useState(initialState);

	let onChange = useCallback(event => {
		if (event.detail.key === key) {
			setState(event.detail.value);
		}
	}, [ key ]);

	useEffect(() => {
		window.addEventListener('localStorageChange', onChange);
		return () => window.removeEventListener('localStorageChange', onChange);
	}, [ onChange ]);

	let syncState = value => {
		setState(value);
		window.localStorage.setItem(key, JSON.stringify(value));
		window.dispatchEvent(
			new CustomEvent('localStorageChange', {
				detail: { key, value }
			})
		);
	};

	return [ state, syncState ];
}
