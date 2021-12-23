import React from 'react';
import { Input } from 'antd';
import moment from 'moment';

import { isNotEmptyArray } from '../../../js/utils';
import style from '../truck.module.scss';

function SideBar({ truckList, setTruckList, trucks }) {
	const onChange = (e) => {
		const value = e.target.value;
		const data = trucks.filter((item) => item.truckNumber.toLowerCase().includes(value.toLowerCase()));
		setTruckList(data);
	};

	return (
		<div className={style.sideBar}>
			<div className={style.sideContent}>
				<Input placeholder='Search Trucks' onChange={onChange} />
			</div>
			{isNotEmptyArray(truckList) &&
				truckList.map((truck, i) => {
					let isRunning = !!truck?.lastRunningState?.truckRunningState;
					return (
						<div key={truck.id}>
							{!!i && <div className={style.divider}></div>}
							<div className={style.sideContent}>
								<div className={style.topContainer}>
									<div className={style.truckName}>{truck?.truckNumber}</div>
									<div className={style.lastUpdated}>{getLastUpdatedTime(truck?.lastWaypoint.updateTime)}</div>
								</div>
								<div className={style.bottomContainer}>
									<div className={style.status}>
										{`${isRunning ? 'Running' : 'Stopped'} since last ${getStopStartTime(truck.stopStartTime)}`}
									</div>
									{!!truck?.lastWaypoint.speed && <div className={style.speed}>{truck?.lastWaypoint.speed} k/h</div>}
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
}

const getStopStartTime = (stamp) => {
	let timeStamp = moment(stamp).hours();
	let status = `${timeStamp} hr`;
	if (timeStamp > 24) {
		status = `${moment(stamp).days()} d`;
	}
	return status;
};

const getLastUpdatedTime = (stamp) => {
	let diff = moment().diff(moment(stamp), 'days');
	return `${diff} h`;
};

export default SideBar;
