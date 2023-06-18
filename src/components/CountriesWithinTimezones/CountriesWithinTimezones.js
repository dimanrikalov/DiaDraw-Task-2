import { useReducer, useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import styles from './CountriesWithinTimezones.module.css';

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
		default:
			return state;
	}
};

export const CountriesWithinTimezones = () => {
	const { data } = useFetchData();
	const [error, setError] = useState(null);
	const [result, setResult] = useState([]);
	const [inputsState, dispatch] = useReducer(reducer, {
		inputOne: '',
		inputTwo: '',
	});

	const handleChange = (e, inputToChange) => {
		dispatch({ type: inputToChange, value: e.target.value });
	};

	const handleSubmit = () => {
        setError(null);

        const timezones = [
          'UTC+14:00',
          'UTC+13:00',
          'UTC+12:45',
          'UTC+12:00',
          'UTC+11:30',
          'UTC+11:00',
          'UTC+10:30',
          'UTC+10:00',
          'UTC+09:30',
          'UTC+09:00',
          'UTC+08:00',
          'UTC+07:00',
          'UTC+06:00',
          'UTC+05:45',
          'UTC+05:30',
          'UTC+05:00',
          'UTC+04:30',
          'UTC+04:00',
          'UTC+03:30',
          'UTC+03:00',
          'UTC+02:00',
          'UTC+01:00',
          'UTC',
          'UTC-01:00',
          'UTC-02:00',
          'UTC-03:00',
          'UTC-03:30',
          'UTC-04:00',
          'UTC-05:00',
          'UTC-06:00',
          'UTC-07:00',
          'UTC-08:00',
          'UTC-09:00',
          'UTC-09:30',
          'UTC-10:00',
          'UTC-11:00',
          'UTC-12:00',
        ];
        const start = timezones.indexOf(inputsState.inputOne);
        const end = timezones.indexOf(inputsState.inputTwo);
      
        const searchedRange = timezones.slice(Math.min(start, end), Math.max(start,end) + 1);
      
        const countriesInTimezones = [];
      
        const findNeighboringCountries = (country) => {
          if (
            country &&
            !countriesInTimezones.includes(country.name.common) &&
            country.timezones.some((timezone) => searchedRange.includes(timezone))
          ) {
            countriesInTimezones.push(country.name.common);
            console.log(country);
            if (country.borders?.length > 0) {
              country.borders.forEach((neighbour) => {
                const neighbouringCountry = data.find((x) => x.cca3 === neighbour);
                findNeighboringCountries(neighbouringCountry);
              });
            }
          }
        };
      
        let startingCountries = data.filter((x) =>
          x.timezones.some((timezone) => searchedRange.includes(timezone))
        );
      
        startingCountries.forEach((startingCountry) => {
          findNeighboringCountries(startingCountry);
        });
      
        setResult(countriesInTimezones);
      };
      

	return (
		<div className={styles.container}>
			<div className={styles.inputDiv}>
				<label htmlFor="timezone-one">
					Enter timezone lowest value:
				</label>
				<input
					type="text"
					name="timezone-one"
					id="timezone-one"
					value={inputsState.valueOne}
					onChange={(e) => handleChange(e, EVENTS.CHANGE_INPUT_ONE)}
				/>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="timezone-two">
					Enter timezone highest value:
				</label>
				<input
					type="text"
					name="timezone-two"
					id="timezone-two"
					value={inputsState.valueTwo}
					onChange={(e) => handleChange(e, EVENTS.CHANGE_INPUT_TWO)}
				/>
			</div>
			<button className={styles.btn} onClick={handleSubmit}>
				Get countries
			</button>
			{error && (
				<div className={styles.errorDiv}>
					<h4>{error}</h4>
				</div>
			)}
			{result.length > 0 && (
				<div className={styles.countryContainer}>
					{result.map((x, i) => (
						<p key={i}>{x}</p>
					))}
				</div>
			)}
		</div>
	);
};
