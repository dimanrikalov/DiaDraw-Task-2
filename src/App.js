import './App.css';
import { useEffect, useState } from 'react';
import { DistanceCalculator } from './components/DistanceCalculator/DistanceCalculator';
import { ClosestCountryThatIsNotNeighbour } from './components/ClosestCountryThatIsNotNeighbour/ClosestCountryThatIsNotNeighbour';

function App() {
	const [data, setData] = useState({});
	
	return (
		<div className="App">
			{/* <DistanceCalculator data={data} /> */}
			<ClosestCountryThatIsNotNeighbour />
		</div>
	);
}

export default App;
