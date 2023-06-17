import './App.css';
import { DistanceCalculator } from './components/DistanceCalculator/DistanceCalculator';
import { ClosestCountryThatIsNotNeighbour } from './components/ClosestCountryThatIsNotNeighbour/ClosestCountryThatIsNotNeighbour';

function App() {
	return (
		<div className="App">
			{/* <DistanceCalculator /> */}
			<ClosestCountryThatIsNotNeighbour />
		</div>
	);
}

export default App;
