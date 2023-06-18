import { useState } from 'react';
import styles from './ClosestCountryThatIsNotNeighbour.module.css';
import { useFetchData } from '../../hooks/useFetchData';
import { useCalculateDistance } from '../../hooks/useCalculateDistance';

export const ClosestCountryThatIsNotNeighbour = () => {
	const { data } = useFetchData(null);
	const [response, setResponse] = useState(null);
	const [errorResponse, setErrorResponse] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const { result, setResult, findDistance, error } = useCalculateDistance(-1); //failed hook

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		setErrorResponse(null);

		if (!inputValue) {
			setErrorResponse('Enter valid country name!');
			return;
		}

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

		if (!country) {
			setErrorResponse('Enter valid country name!');
			return;
		}

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
			setResponse({ answer: 'None', distance: 0 });
			return;
		}

		const distancesArray = finalRes
			.map((x) => {
				const res = findDistance(country.cca3, x);//problem is here
				return [x, res];
			})
			.sort((a, b) => a[1] - b[1]);

		const answer = data.find((x) => x.cca3 === distancesArray[0][0]).name
			.common;
		setResponse({ answer, distance: distancesArray[0][1] });
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

			{errorResponse && (
				<div className={styles.errorDiv}>
					<h4>{errorResponse}</h4>
				</div>
			)}
			{response && (
				<h3>
					Closest not neighbouring country is: {response.answer} with
					distance: {response.distance} kms.
				</h3>
			)}
		</div>
	);
};
