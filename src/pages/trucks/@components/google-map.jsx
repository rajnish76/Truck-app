import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

const GoogleMap = ({ truckList }) => {
	const defaultProps = {
		center: {
			lat: truckList[0].lastRunningState.lat,
			lng: truckList[0].lastRunningState.lng,
		},
		zoom: 18,
	};

	const LocationPin = ({ data }) => {
		const color = data.lastWaypoint.speed > 0 ? 'green' : 'blue';
		return <Icon icon={locationIcon} style={{ color, fontSize: '24px' }} />;
	};

	return (
		<div style={{ height: '88.5vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyAyYthL5mEcKt-qnreWHwQ31f5BqQH0xOQ' }}
				defaultCenter={defaultProps.center}
				yesIWantToUseGoogleMapApiInternals
				defaultZoom={defaultProps.zoom}>
				{truckList.map((item) => (
					<LocationPin key={item.id} lat={item.lastRunningState.lat} lng={item.lastRunningState.lng} data={item} />
				))}
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMap;
