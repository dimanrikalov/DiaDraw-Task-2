import { useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import styles from './SearchCountriesByCharacters.module.css';

export const SearchCountriesByCharacters = () => {
	const { data } = useFetchData(null);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = () => {
		setResult(null);
		setError(null);

		if (!inputValue) {
			setError('Please enter 1-2 characters!');
			return;
		}

		if (inputValue.length > 2) {
			setError('Maximum input is 2 characters!');
			return;
		}
		const res = [];
		data.forEach((x) => {
			if (
				x.name.common.toLowerCase().includes(inputValue.toLowerCase())
			) {
				res.push(x.name.common);
			}
		});

		setResult(res);
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputDiv}>
				<label htmlFor="country-name">Enter characters (max 2):</label>
				<input
					type="text"
					name="country-name"
					id="country-name"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
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
			{result?.length > 0 && (
				<div className={styles.countryContainer}>
					{result.map((x, i) => (
						<p key={i}>{x}</p>
					))}
				</div>
			)}
			{result?.length === 0 && (
				<p>No country matches the entered characters</p>
			)}
		</div>
	);
};
