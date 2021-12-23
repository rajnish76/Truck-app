import React, { useEffect, useState } from 'react';
import { Row, Col, Select } from 'antd';

import style from '../truck.module.scss';
import { isNotEmptyArray } from '../../../js/utils';

const { Option } = Select;

function TruckHeader({ setTruckList, trucks, truckList }) {
	const [truckStatus, setTruckStatus] = useState('all');
	const [truckData, setTruckData] = useState({ running: [], stopped: [] });

	useEffect(() => {
		getUpdatedTrucks(trucks);
	}, [trucks]);

	const getUpdatedTrucks = (data) => {
		let runningTruckList = [];
		let stoppedTruckList = [];
		console.log('data', data);
		data.forEach((truck) => {
			if (truck?.lastWaypoint.speed) {
				runningTruckList.push(truck);
			} else {
				stoppedTruckList.push(truck);
			}
		});
		setTruckData({ running: runningTruckList, stopped: stoppedTruckList });
	};

	const onChange = (status) => {
		let _trucks = trucks;
		if (status === 'running') {
			_trucks = truckData.running;
		} else if (status === 'stopped') {
			_trucks = truckData.stopped;
		}
		setTruckList(_trucks);
		setTruckStatus(status);
	};

	const TruckHeaderContent = ({ children, status }) => {
		const isActive = status === truckStatus;

		return (
			<Col
				align='center'
				span={6}
				className={style.truckContainer}
				onClick={() => onChange(status)}
				style={{ backgroundColor: isActive ? '#e9ebeb' : '#fff' }}>
				{children}
			</Col>
		);
	};

	return (
		<Row className={style.header}>
			<TruckHeaderContent status='all'>
				<div className={style.headTruck}>Total Trucks</div>
				<div className={style.truckCount}>{truckData.running.length + truckData.stopped.length}</div>
			</TruckHeaderContent>
			<TruckHeaderContent status='running'>
				<div className={style.headTruck}>Running Trucks</div>
				<div className={style.truckCount}>{truckData.running.length}</div>
			</TruckHeaderContent>
			<TruckHeaderContent status='stopped'>
				<div className={style.headTruck}>Stopped Trucks</div>
				<div className={style.truckCount}>{truckData.stopped.length}</div>
			</TruckHeaderContent>
			<Col align='center' span={6} className={style.truckContainer}>
				<SelectFilter setTruckList={setTruckList} trucks={trucks} truckList={truckList} getUpdatedTrucks={getUpdatedTrucks} />
			</Col>
		</Row>
	);
}

const SelectFilter = ({ setTruckList, trucks, getUpdatedTrucks }) => {
	const [selected, setSelected] = useState([]);
	const onChange = (val) => {
		const data = [...trucks];
		if (isNotEmptyArray(val)) {
			const filterData = data.filter((item) => val.includes(item?.truckNumber));
			setTruckList(filterData);
			getUpdatedTrucks(filterData);
		} else {
			setTruckList(data);
			getUpdatedTrucks(data);
		}
		setSelected(val);
	};
	return (
		<Select
			showSearch
			maxTagCount={2}
			mode='multiple'
			placeholder='Select a trucks'
			optionFilterProp='children'
			style={{ width: '90%' }}
			onChange={onChange}
			value={selected}
			filterOption={(input, option) => option.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
			{trucks.map((truck) => {
				return (
					<Option key={truck.id} value={truck.truckNumber}>
						{truck.truckNumber}
					</Option>
				);
			})}
		</Select>
	);
};

export default TruckHeader;
