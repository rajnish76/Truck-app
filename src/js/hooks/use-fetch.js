
import { useReducer, useState, useEffect } from 'react';

import { parseFields, resolveProp } from '../utils';

/**
 * Uses a fetch request and returns the loading state, error state, and response data of the request.
 *
 * A new fetch will be initiated when:
 * - The request function reference changes.
 * - The properties of the payload change.
 *
 * WARNING:
 * Using an inline function for the request will cause an infinite fetch loop because a new function reference is
 * created on every render. To avoid this, the request function must be memoized, or defined outside the body of
 * the component.
 *
 * @example
 * <code>
 *     let response = useFetch({
 *         request: api.entity.findDistinctById,
 *         payload: { id: 42 },
 *         schema: {
 *             data: 'path.to.response.data',
 *             total: 'path.to.response.total',
 *             fields: {
 *                 someDateField: 'date',
 *                 someUnixField: 'unix
 *             }
 *         }
 *     });
 * </code>
 *
 * @param   {Object}   props
 * @param   {Function} props.request          Makes a request with the given payload as an argument. Must return a promise.
 * @param   {Object}   [props.payload]        The payload to send with the request.
 * @param   {Object}   [props.dontCall]       Boolean to restrict the api call.
 * @param   {Object}   [props.schema]
 * @param   {Object}   [props.schema.data]    The path to the data property on the response object.
 * @param   {String}   [props.schema.total]   The path to the total property on the response object.
 * @param   {Object}   [props.schema.fields]  Optionally maps each data field to a type (date, unix).
 * @returns {{
 *     payload: Object,
 *     data: Object,
 *     total: Number,
 *	   dontCall: Boolean,
 *     error: Object,
 *     loading: Boolean,
 *     refresh: function()
 * }}
 */
export function useFetch(props) {

	let { request, payload, schema = {}, dontCall = false } = props;
	let initialState = {
		data: null,
		error: null,
		loading: true,
		total: null,
		payload
	};

	let [cacheBreaker, setCacheBreaker] = useState();
	let [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {

		if (dontCall) {
			dispatch({ error: null, data: null, total: null, loading: false });
		} else {
			let didCancel = false;

			dispatch({ loading: true, payload });
			request(payload)
				.then(response => {

					if (didCancel) {
						return;
					}

					let data = schema.data ? resolveProp(response.data, schema.data, null) : response.data;
					let total = schema.total ? resolveProp(response.data, schema.total, 0) : null;
					parseFields(data, schema.fields);
					dispatch({ data, total, error: null, loading: false });
				})
				.catch(error => {
					dispatch({ error, data: null, total: null, loading: false });
				});

			return () => {
				didCancel = true;
			};
		}
	}, [
		request,
		JSON.stringify(payload),
		cacheBreaker,
		dontCall
	]);

	let refresh = () => setCacheBreaker(Date.now());

	return { ...state, refresh };
}

/**
 * Reducer for the fetch state.
 *
 * @param   {Object} state
 * @param   {Object} action
 * @returns {Object}
 */
function reducer(state, action) {
	return { ...state, ...action };
}
