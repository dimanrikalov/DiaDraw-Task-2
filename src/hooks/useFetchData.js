import { useState, useEffect } from "react";


export const useFetchData = (initState) => {
    const [data, setData] = useState(initState);

    useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);


    return { data };
}