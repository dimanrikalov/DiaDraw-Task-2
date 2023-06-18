import './App.css';
import { DistanceCalculator } from './components/DistanceCalculator/DistanceCalculator';
import { CountriesWithinTimezones } from './components/CountriesWithinTimezones/CountriesWithinTimezones';
import { ClosestCountryThatIsNotNeighbour } from './components/ClosestCountryThatIsNotNeighbour/ClosestCountryThatIsNotNeighbour';

function App() {
	return (
		<div className="App">
			{/* <DistanceCalculator /> */}
			{/* <ClosestCountryThatIsNotNeighbour /> */}
			<CountriesWithinTimezones />
		</div>
	);
}

export default App;
