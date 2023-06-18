import './App.css';
import { DistanceCalculator } from './components/DistanceCalculator/DistanceCalculator';
import { CountriesWithinTimezones } from './components/CountriesWithinTimezones/CountriesWithinTimezones';
import { SearchCountriesByCharacters } from './components/SearchCountriesByCharacters/SearchCountriesByCharacters';
import { ClosestCountryThatIsNotNeighbour } from './components/ClosestCountryThatIsNotNeighbour/ClosestCountryThatIsNotNeighbour';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Navigate,
	Outlet,
} from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';

const Root = () => {
	return (
		<>
			<Navigate to="/distance-calculator" replace={true} />
			<Navigation />
			<Outlet />
		</>
	);
};

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
				<Route
					index={true}
					path="/distance-calculator"
					element={<DistanceCalculator />}
				/>
				<Route
					path="/find-closest-non-neighbouring-country"
					element={<ClosestCountryThatIsNotNeighbour />}
				/>
				<Route
					path="/find-countries-within-timezones"
					element={<CountriesWithinTimezones />}
				/>
				<Route
					path="/find-countries-with-characters"
					element={<SearchCountriesByCharacters />}
				/>
			</Route>
		)
	);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
