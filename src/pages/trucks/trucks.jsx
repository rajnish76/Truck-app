import React, { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';

import api from '../../api/api';
import { useFetch } from '../../js/hooks';
import { isNotEmptyArray } from '../../js/utils';
import { GoogleMap, SideBar, TruckHeader } from '.';

import style from './truck.module.scss';

const Trucks = () => {
	const [truckList, setTruckList] = useState(null);

	const response = useFetch({
		request: api.trucks.logistics,
	});

	useEffect(() => {
		if (isNotEmptyArray(response?.data?.data)) {
			setTruckList(response.data.data);
		}
	}, [response.data]);

	if (response.loading && !isNotEmptyArray(truckList)) {
		return (
			<div className={style.spinCenter}>
				<Spin />
			</div>
		);
	}

	return (
		<>
			{isNotEmptyArray(truckList) && (
				<>
					<TruckHeader setTruckList={setTruckList} trucks={response?.data?.data} truckList={truckList} />
					<Row>
						<Col span={5}>
							<SideBar truckList={truckList} setTruckList={setTruckList} trucks={response?.data?.data} />
						</Col>
						<Col className={style.mapContainer} span={19}>
							<GoogleMap truckList={truckList} />
						</Col>
					</Row>
				</>
			)}
		</>
	);
};
export default Trucks;
