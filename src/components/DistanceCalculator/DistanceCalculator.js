import { useReducer, useState } from 'react';
import styles from './DistanceCalculator.module.css';
import { useFetchData } from '../../hooks/useFetchData';

const EVENTS = {
	CHANGE_INPUT_ONE: 'CHANGE_INPUT_ONE',
	CHANGE_INPUT_TWO: 'CHANGE_INPUT_TWO',
};

const reducer = (state, action) => {
	switch (action.type) {
		case EVENTS.CHANGE_INPUT_ONE:
			return {
				...state,
				inputOne: action.value,
			};
		case EVENTS.CHANGE_INPUT_TWO:
			return {
				...state,
				inputTwo: action.value,
			};
	}
};

export const DistanceCalculator = () => {
	const {data} = useFetchData(null);
	const [error, setError] = useState(null);
	const [inputsState, dispatch] = useReducer(reducer, {
		inputOne: '',
		inputTwo: '',
	});
	const [distance, setDistance] = useState(0);



	const handleChange = (e, inputToChange) => {
		dispatch({ type: inputToChange, value: e.target.value });
	};

    const findDistance = (countryOne, countryTwo) => {
        const earthRadius = 6371;
        const countryOneObj = data.find((x) => x.cca3 === countryOne);
        const countryTwoObj = data.find((x) => x.cca3 === countryTwo);
      
        console.log(countryOneObj);
        console.log(countryTwoObj);
      
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
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
      
        return distance.toFixed(2);
      };
      
      // Helper function to convert degrees to radians
      const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
      };
      

	const handleSubmit = () => {
		const result = findDistance(inputsState.inputOne, inputsState.inputTwo);
		setDistance(result);
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputDiv}>
				<label htmlFor="country-one">Enter CCA3 code for country 1:</label>
				<input
					type="text"
					name="country-one"
					id="country-one"
					value={inputsState.valueOne}
					onChange={(e) => handleChange(e, EVENTS.CHANGE_INPUT_ONE)}
				/>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="country-two">Enter CCA3 code for country 2:</label>
				<input
					type="text"
					name="country-two"
					id="country-two"
					value={inputsState.valueTwo}
					onChange={(e) => handleChange(e, EVENTS.CHANGE_INPUT_TWO)}
				/>
			</div>
			<button className={styles.btn} onClick={handleSubmit}>
				Calculate distance
			</button>
			{error && (
				<div className={styles.errorDiv}>
					<h4>{error}</h4>
				</div>
			)}
			<h3>Result: {distance} kms</h3>
		</div>
	);
};
