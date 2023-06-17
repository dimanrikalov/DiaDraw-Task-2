import { useReducer, useState } from 'react';
import styles from './ClosestCountryThatIsNotNeighbour.module.css';
import { useFetchData } from '../../hooks/useFetchData';

const toRadians = (degrees) => {
	return degrees * (Math.PI / 180);
};

export const ClosestCountryThatIsNotNeighbour = () => {
	const { data } = useFetchData(null);
	const [result, setResult] = useState({});
	const [error, setError] = useState(null);
	const [inputValue, setInputValue] = useState('');

	const findDistance = (countryOne, countryTwo) => {
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

		const dLat = toRadians(lat2 - lat1);
		const dLng = toRadians(lng2 - lng1);

		const a =
			Math.sin(dLat / 2) ** 2 +
			Math.cos(toRadians(lat1)) *
				Math.cos(toRadians(lat2)) *
				Math.sin(dLng / 2) ** 2;
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = earthRadius * c;

		return distance.toFixed(2);
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		const country = data.find((x) => {
			if (
				Array.from(Object.values(x.name)).some(
					(y) =>
						typeof y === 'string' &&
						y.toLowerCase() === inputValue.toLowerCase()
				) ||
				x.altSpellings.some(
					(y) => y.toLowerCase() === inputValue.toLowerCase()
				)
			) {
				return x;
			}
		});

		const neighbours = country.borders; // [AUT, FRA, SMR, SVN, CHE, VAT]

		const neighboursOfNeighbours = [];
		neighbours.forEach((x) => {
			const curr = data.find((y) => y.cca3 === x);
			neighboursOfNeighbours.push(...curr.borders.filter((y) => y !== x));
		});

		const realRes = Array.from(new Set(neighboursOfNeighbours));
		const finalRes = realRes.filter(
			(x) => !neighbours.includes(x) && x !== country.cca3
		);

		//no neighbours of neighbours case
		if (!finalRes.length) {
			setResult({ answer: 'None', distance: 0 });
			return;
		}

		const distancesArray = finalRes
			.map((x) => [x, findDistance(country.cca3, x)])
			.sort((a, b) => a[1] - b[1]);
		const answer = data.find((x) => x.cca3 === distancesArray[0][0]).name
			.common;
		setResult({ answer, distance: distancesArray[0][1] });
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputDiv}>
				<label htmlFor="country-one">Enter country name</label>
				<input
					type="text"
					name="country-one"
					id="country-one"
					value={inputValue}
					onChange={handleChange}
				/>
				<button className={styles.btn} onClick={handleSubmit}>
					Calculate distance
				</button>
			</div>

			{error && (
				<div className={styles.errorDiv}>
					<h4>{error}</h4>
				</div>
			)}
			<h3>
				Closest not neighbouring country is: {result.answer} with
				distance: {result.distance} kms.
			</h3>
		</div>
	);
};
