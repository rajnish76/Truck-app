/* eslint-disable import/no-anonymous-default-export */
import http from '../http';

const BASEPOINT = 'logistics/';

export default {
	logistics() {
		return http.get(`${ BASEPOINT }searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint`);
	}
};
