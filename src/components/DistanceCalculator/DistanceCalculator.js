import { useReducer } from 'react';
import styles from './DistanceCalculator.module.css';
import { useCalculateDistance } from '../../hooks/useCalculateDistance';

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

export const DistanceCalculator = () => {
	const { result, setResult, findDistance, error } = useCalculateDistance(-1);
	const [inputsState, dispatch] = useReducer(reducer, {
		inputOne: '',
		inputTwo: '',
	});

	const handleChange = (e, inputToChange) => {
		dispatch({ type: inputToChange, value: e.target.value });
	};

	const handleSubmit = () => {
		setResult(-1);
		findDistance(inputsState.inputOne, inputsState.inputTwo);
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputDiv}>
				<label htmlFor="country-one">
					Enter CCA3 code for country 1:
				</label>
				<input
					type="text"
					name="country-one"
					id="country-one"
					value={inputsState.valueOne}
					onChange={(e) => handleChange(e, EVENTS.CHANGE_INPUT_ONE)}
				/>
			</div>
			<div className={styles.inputDiv}>
				<label htmlFor="country-two">
					Enter CCA3 code for country 2:
				</label>
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
			{result !== -1 && <h3>Result: {result} kms</h3>}
		</div>
	);
};
