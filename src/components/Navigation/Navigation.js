import styles from './Navigation.module.css';
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
	const navigate = useNavigate();

    return (
		<header className={styles.header}>
			<nav>
				<ul>
					<li>
						<button onClick={() => navigate('/distance-calculator')}>Distance calculator</button>
					</li>
					<li>
						<button onClick={() => navigate('/find-closest-non-neighbouring-country')}>Find closest Non-neighbouring country</button>
					</li>
					<li>
						<button onClick={() => navigate('/find-countries-within-timezones')}>Find countries within 2 timezones</button>
					</li>
					<li>
						<button onClick={() => navigate('/find-countries-with-characters')}>Find countries by characters</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};
