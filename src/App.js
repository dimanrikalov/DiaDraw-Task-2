import './App.css';
import { DistanceCalculator } from './components/DistanceCalculator/DistanceCalculator';
import { CountriesWithinTimezones } from './components/CountriesWithinTimezones/CountriesWithinTimezones';
import { SearchCountriesByCharacters } from './components/SearchCountriesByCharacters/SearchCountriesByCharacters';
import { ClosestCountryThatIsNotNeighbour } from './components/ClosestCountryThatIsNotNeighbour/ClosestCountryThatIsNotNeighbour';

function App() {
	return (
		<div className="App">
			{/* <DistanceCalculator /> */}
			{/* <ClosestCountryThatIsNotNeighbour /> */}
			{/* <CountriesWithinTimezones /> */}
			<SearchCountriesByCharacters />
		</div>
	);
}

export default App;
