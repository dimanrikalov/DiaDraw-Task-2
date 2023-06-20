import { useFetchData } from './useFetchData';
import { useState, useCallback } from 'react';

export const useCalculateDistance = (initData) => {
	const { data } = useFetchData(null);
	const [result, setResult] = useState(initData);
	const [error, setError] = useState(null);


	const findDistance = useCallback(
		(countryOne, countryTwo) => {
			const earthRadius = 6371;
			const countryOneObj = data.find((x) => x.cca3 === countryOne);
			const countryTwoObj = data.find((x) => x.cca3 === countryTwo);

			if (!countryOneObj) {
				setError('Invalid 3-digit code for country one!');
				return;
			}
			if (!countryTwoObj) {
				setError('Invalid 3-digit code for country two!');
				return;
			}
			setError(null);

			const lat1 = countryOneObj.latlng[0];
			const lng1 = countryOneObj.latlng[1];
			const lat2 = countryTwoObj.latlng[0];
			const lng2 = countryTwoObj.latlng[1];

			const toRadians = (angle) => angle * (Math.PI / 180);

			const dLat = toRadians(lat2 - lat1);
			const dLng = toRadians(lng2 - lng1);

			const a =
				Math.sin(dLat / 2) ** 2 +
				Math.cos(toRadians(lat1)) *
					Math.cos(toRadians(lat2)) *
					Math.sin(dLng / 2) ** 2;
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const distance = earthRadius * c;
			setResult(distance.toFixed(2));
			return distance.toFixed(2);
		},
		[data]
	);

	return { result, setResult, findDistance, error };
};
